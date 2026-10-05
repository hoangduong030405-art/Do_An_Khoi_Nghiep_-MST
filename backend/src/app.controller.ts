import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Public } from './modules/auth/decorators/public.decorator';

@Controller()
export class AppController {
  // Health check phải @Public() để Docker/K8s probe được mà không cần token.
  @Public()
  @Get('health')
  @HttpCode(HttpStatus.OK)
  getHealth() {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }

  // Endpoint /me đã nằm ở AuthController (/api/v1/auth/me) và trả qua
  // AuthResponseDto nên không rò field nhạy cảm. Không lặp lại ở đây.
}