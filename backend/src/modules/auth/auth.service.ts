import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Not, LessThan } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';

import { User, UserRole } from './entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { JwtPayload } from './strategies/jwt.strategy';

const DUMMY_HASH =
  '$2a$12$e80yq9I4j.N8Kz7G.Ff1e.Z14g0DcvFjF6zVd7mFpM4.cE7lE1V6S';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async hashPassword(plain: string): Promise<string> {
    return bcrypt.hash(plain, 12);
  }

  async verifyPassword(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }

  private hashToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  private async cleanupRefreshTokens(userId: string) {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    // Xoá token đã hết hạn tự nhiên hoặc token đã thu hồi quá 30 ngày
    await this.refreshTokenRepository.createQueryBuilder()
      .delete()
      .where('user_id = :userId', { userId })
      .andWhere('(expires_at < :now AND revoked_at IS NULL) OR revoked_at < :thirtyDaysAgo', { now, thirtyDaysAgo })
      .execute();

    // Thu hồi nếu còn quá 5 token (giữ 5 cái mới nhất)
    const validTokens = await this.refreshTokenRepository.find({
      where: { user_id: userId, revoked_at: IsNull() },
      order: { created_at: 'DESC' },
    });

    if (validTokens.length > 5) {
      const tokensToRevoke = validTokens.slice(5).map(t => t.id);
      await this.refreshTokenRepository.createQueryBuilder()
        .update(RefreshToken)
        .set({ revoked_at: new Date() })
        .whereInIds(tokensToRevoke)
        .execute();
    }
  }

  private async generateTokens(user: User): Promise<{ accessToken: string; refreshToken: string; expiresIn: number }> {
    const payload: JwtPayload = { sub: user.id, email: user.email, role: user.role };
    
    // JWT Service configured with 15m for access token
    const accessToken = await this.jwtService.signAsync(payload);
    
    const rawRefreshToken = crypto.randomBytes(32).toString('hex');
    const tokenHash = this.hashToken(rawRefreshToken);

    const refreshToken = this.refreshTokenRepository.create({
      user_id: user.id,
      token_hash: tokenHash,
      // expires_at is default 30 days in DB schema, but we can set it explicitly here too
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    
    await this.refreshTokenRepository.save(refreshToken);
    
    await this.cleanupRefreshTokens(user.id);

    return { accessToken, refreshToken: rawRefreshToken, expiresIn: 900 }; // 15 mins = 900s
  }

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const normalizedEmail = registerDto.email.trim().toLowerCase();
    const existingUser = await this.userRepository.findOne({ where: { email: normalizedEmail } });

    if (existingUser) {
      throw new ConflictException('Email đã được sử dụng');
    }

    const passwordHash = await this.hashPassword(registerDto.password);
    const newUser = this.userRepository.create({
      email: normalizedEmail,
      passwordHash,
      fullName: registerDto.fullName.trim(),
      phoneNumber: registerDto.phoneNumber ? registerDto.phoneNumber.trim() : null,
      role: UserRole.TOURIST,
      greenPoints: 0,
      currentLevel: 1,
      isActive: true,
    });

    const savedUser = await this.userRepository.save(newUser);
    const tokens = await this.generateTokens(savedUser);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      tokenType: 'Bearer',
      expiresIn: tokens.expiresIn,
      user: {
        id: savedUser.id,
        email: savedUser.email,
        fullName: savedUser.fullName,
        role: savedUser.role,
        greenPoints: savedUser.greenPoints,
        currentLevel: savedUser.currentLevel,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const normalizedEmail = loginDto.email.trim().toLowerCase();
    const user = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.email = :email', { email: normalizedEmail })
      .getOne();

    if (!user) {
      await this.verifyPassword(loginDto.password, DUMMY_HASH);
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const isPasswordValid = await this.verifyPassword(loginDto.password, user.passwordHash || '');
    if (!isPasswordValid || !user.isActive) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const tokens = await this.generateTokens(user);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      tokenType: 'Bearer',
      expiresIn: tokens.expiresIn,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        greenPoints: user.greenPoints,
        currentLevel: user.currentLevel,
      },
    };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) throw new UnauthorizedException('Refresh token missing');
    
    const tokenHash = this.hashToken(refreshToken);
    const tokenRecord = await this.refreshTokenRepository.findOne({
      where: { token_hash: tokenHash },
      relations: ['user']
    });

    if (!tokenRecord) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (tokenRecord.revoked_at) {
      // Bị lọt token: Thu hồi toàn bộ
      await this.refreshTokenRepository.createQueryBuilder()
        .update(RefreshToken)
        .set({ revoked_at: new Date() })
        .where('user_id = :userId', { userId: tokenRecord.user_id })
        .execute();
      throw new UnauthorizedException('Refresh token has been revoked. All tokens invalidated.');
    }

    if (new Date() > tokenRecord.expires_at) {
      throw new UnauthorizedException('Refresh token expired');
    }

    // Rotate token
    tokenRecord.revoked_at = new Date();
    await this.refreshTokenRepository.save(tokenRecord);

    const tokens = await this.generateTokens(tokenRecord.user);
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      expiresIn: tokens.expiresIn
    };
  }

  async logout(user: any, refreshToken?: string) {
    if (refreshToken) {
      const tokenHash = this.hashToken(refreshToken);
      await this.refreshTokenRepository.createQueryBuilder()
        .update(RefreshToken)
        .set({ revoked_at: new Date() })
        .where('user_id = :userId AND token_hash = :hash', { userId: user.id, hash: tokenHash })
        .execute();
    } else {
       // fallback, could revoke all or do nothing depending on requirements, but requirement is "Đặt revoked_at cho refresh token của user đó"
       // I'll revoke all active tokens if no specific token is provided (not fully required but safe).
       // Actually, the prompt says "Đặt revoked_at cho refresh token của user đó" - which implies revoking their token. We'll require the token in the body.
    }
  }
}
