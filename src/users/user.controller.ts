import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IRequest } from 'src/shared/interfaces/request';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/shared/enum/roles';
import { Roles } from 'src/auth/roles.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
  })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.userService.findAll(page, limit);
  }

  @Roles(Role.User)
  @Get('me')
  @ApiOperation({
    summary: 'Get current user profile',
  })
  current(@Request() req: IRequest) {
    return this.userService.current(req.user);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by id',
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
}
