export class UserProfileDto {
  id: string;
  email: string;
  fullName: string;
  role: string;
  greenPoints: number;
  currentLevel: number;
}

export class AuthResponseDto {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  user: UserProfileDto;
}
