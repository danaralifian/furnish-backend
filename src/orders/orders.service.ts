import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { IResponse } from 'src/shared/interfaces/response';
import { formatResponse } from 'src/common/helpers/format-response';
import { UserDto } from 'src/users/dto/user.dto';
import { calculatePagination } from 'src/common/helpers/calculate-pagination';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(
    createOrderDto: OrderDto,
    user: UserDto,
  ): Promise<IResponse<OrderDto>> {
    const order = plainToInstance(Order, { createOrderDto, user });
    const newOrder = await this.orderRepository.save(order);
    console.log(newOrder);

    return formatResponse(newOrder, OrderDto);
  }

  async findAll(
    user: UserDto,
    page: number,
    limit: number,
  ): Promise<IResponse<OrderDto>> {
    const skip = (page - 1) * limit; //offset
    const [orders, total] = await this.orderRepository.findAndCount({
      take: limit,
      skip,
      order: { createdAt: 'DESC' }, // optional: latest first
      relations: ['user', 'invoice'],
    });

    const pagination = calculatePagination(total, page, limit);
    return formatResponse(orders, OrderDto, pagination);
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
