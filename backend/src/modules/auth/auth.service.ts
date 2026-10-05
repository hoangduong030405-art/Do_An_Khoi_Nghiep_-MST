import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { User, UserRole } from './entities/user.entity';
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
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(plain: string): Promise<string> {
    return bcrypt.hash(plain, 12);
  }

  async verifyPassword(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const normalizedEmail = registerDto.email.trim().toLowerCase();

    const existingUser = await this.userRepository.findOne({
      where: { email: normalizedEmail },
    });

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

    const payload: JwtPayload = {
      sub: savedUser.id,
      email: savedUser.email,
      role: savedUser.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn: 604800,
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
      // Chống timing attack: so khớp hash giả khi email không tồn tại
      await this.verifyPassword(loginDto.password, DUMMY_HASH);
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const isPasswordValid = await this.verifyPassword(
      loginDto.password,
      user.passwordHash || '',
    );

    if (!isPasswordValid || !user.isActive) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn: 604800,
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
}
