import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  HttpCode,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/shared/enum/roles';
import { CreateOrderDto } from './dto/create.order.dto';
import { IRequest } from 'src/shared/interfaces/request';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.User)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @HttpCode(200)
  @Post()
  create(@Request() req: IRequest, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto, req.user);
  }

  @Get()
  findAll(
    @Request() req: IRequest,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.ordersService.findAll(req.user, page, limit);
  }

  @Get(':id')
  findOne(@Request() req: IRequest, @Param('id') id: string) {
    return this.ordersService.findOne(req.user, +id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.ordersService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
