import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/login.dto';
import { Public } from '../decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @ApiTags('auth')
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.userService.validateUser(loginDto.email, loginDto.password);
  }
}
