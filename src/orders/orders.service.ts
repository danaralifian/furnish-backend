import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { IResponse } from 'src/shared/interfaces/response';
import { formatResponse } from 'src/common/helpers/format-response';
import { UserDto } from 'src/users/dto/user.dto';
import { calculatePagination } from 'src/common/helpers/calculate-pagination';
import { Invoice } from './entities/invoice.entity';
import { OrderItem } from './entities/order-item.entity';
import { generateCustomId } from 'src/common/helpers/generated-id';
import { PREFIX_GENERATED_ID } from 'src/shared/enum/prefix-generated-id';
import { CreateOrderDto } from './dto/create.order.dto';
import { CheckoutService } from 'src/checkout/checkout.service';
import { Product } from 'src/products/entities/product.entity';
import { CreateOrderResponseDto } from './dto/create.order.response.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,

    private readonly checkoutService: CheckoutService,
  ) {}

  async create(
    createOrderDto: CreateOrderDto,
    user: UserDto,
  ): Promise<IResponse<CreateOrderResponseDto>> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let invoice = new Invoice();

    //calculate the total price of the order
    const summary =
      await this.checkoutService.calculateCheckoutSummary(createOrderDto);

    try {
      //generate order id
      const orderId = await generateCustomId(
        PREFIX_GENERATED_ID.ORDER,
        this.orderRepository,
        new Date(),
        'orderId',
      );

      // create invoice
      invoice = queryRunner.manager.create(Invoice, {
        user,
        totalAmount: summary.totalAmount,
      });

      // save invoice
      await queryRunner.manager.save(invoice);

      //loop seller-level order
      for (const sellerOrder of summary.orders) {
        //create order
        const order = queryRunner.manager.create(Order, {
          invoice,
          sellerId: sellerOrder.sellerId,
          orderId,
          subTotal: sellerOrder.subTotal,
          tax: sellerOrder.tax,
          total: sellerOrder.total,
        });

        //save order
        await queryRunner.manager.save(order);

        //loop order item
        for (const item of sellerOrder.items) {
          //lock product to prevent race condition
          const product = await queryRunner.manager.findOne(Product, {
            where: { id: item.productId },
            lock: { mode: 'pessimistic_write' },
          });

          if (!product)
            throw new Error(`Product ID ${item.productId} not found`);
          if (product.stock < item.quantity)
            throw new Error(`Product ID ${item.productId}, Out of stock`);

          //decrease stock
          product.stock -= item.quantity;
          await queryRunner.manager.save(product);

          //create order item
          const orderItem = queryRunner.manager.create(OrderItem, {
            order,
            product,
            quantity: item.quantity,
            price: product.price,
            total: product.price * item.quantity,
          });

          //save order item
          await queryRunner.manager.save(orderItem);

          await queryRunner.manager.save(invoice);
        }
      }

      //commit transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }

    const detailInvoice = await this.invoiceRepository.findOneBy({
      id: invoice.id,
    });

    const orders = await this.orderItemRepository
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.order', 'order')
      .leftJoin('order.invoice', 'invoice')
      .leftJoinAndSelect('item.product', 'product')
      .where('invoice.id = :invoiceId', { invoiceId: invoice.id })
      .getMany();

    return formatResponse(
      {
        ...detailInvoice,
        orders,
      },
      CreateOrderResponseDto,
    );
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
    return { id };
  }

  update(id: number) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
