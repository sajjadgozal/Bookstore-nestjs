import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '../enums/role.enum';
import { Roles } from '../decorators/roles.decorator';
import {
  ApiBearerAuth,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('seed')
  @Public()
  @ApiOperation({
    summary: 'Seed users',
    description:
      'Seed users. Only available in development mode.  [ user@a.a - admin@a.a - manager@a.a ] , password of all: password',
  })
  seed() {
    if (process.env.NODE_ENV !== 'dev') {
      return 'Seeding is only allowed in development mode';
    }
    return this.userService.seed();
  }

  @Get('profile')
  @ApiTags('user')
  @Roles(Role.Admin, Role.Manager, Role.User)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get profile',
    description: 'Get profile of the user.',
  })
  getProfile(@Request() req) {
    return req.user;
  }

  @Post()
  @Public()
  @ApiTags('user')
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Create a new user.',
  })
  @ApiBearerAuth()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieve a list of all users.',
  })
  @ApiTags('user')
  @ApiBearerAuth()
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiExcludeEndpoint()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiExcludeEndpoint()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiExcludeEndpoint()
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
