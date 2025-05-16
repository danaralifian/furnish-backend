import {
  Controller,
  Get,
  Post,
  Body,
  Param,
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
import { ApiOperation } from '@nestjs/swagger';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.User)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @HttpCode(200)
  @Post()
  @ApiOperation({ summary: 'Create order' })
  create(@Request() req: IRequest, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all orders' })
  findAll(
    @Request() req: IRequest,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.ordersService.findAll(req.user, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by id' })
  findOne(@Request() req: IRequest, @Param('id') id: string) {
    return this.ordersService.findOne(req.user, +id);
  }
}
