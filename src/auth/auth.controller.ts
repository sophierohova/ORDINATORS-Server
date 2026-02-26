import { Controller, Post, Body, Get, UseGuards, Request, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LogsService } from '../logs/logs.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private logsService: LogsService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Req() req) {
    const result = await this.authService.login(loginDto);
    
    if (result.user) {
      await this.logsService.create({
        userId: result.user.id,
        userFio: result.user.fio,
        userRole: result.user.role,
        actionType: 'LOGIN',
        description: `Вход в систему`,
        ipAddress: req.ip,
      });
    }
    
    return result;
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Req() req) {
    const result = await this.authService.register(registerDto);
    
    if (result.user) {
      await this.logsService.create({
        userId: result.user.id,
        userFio: result.user.fio,
        userRole: result.user.role,
        actionType: 'REGISTER',
        description: `Регистрация нового пользователя: ${registerDto.login}`,
        ipAddress: req.ip,
      });
    }
    
    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate')
  async validate(@Request() req) {
    return this.authService.validateToken(req.user.userId);
  }
  
}