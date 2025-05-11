import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';
import { IResponse } from 'src/shared/interfaces/response';
import { formatResponse } from 'src/common/helpers/format-response';
import { UserDto } from 'src/users/dto/user.dto';
import { calculatePagination } from 'src/common/helpers/calculate-pagination';
import { Invoice } from '../invoices/entities/invoice.entity';
import { OrderItem } from './entities/order-item.entity';
import { generateCustomId } from 'src/common/helpers/generated-id';
import { PREFIX_GENERATED_ID } from 'src/shared/enum/prefix-generated-id';
import { CreateOrderDto } from './dto/create.order.dto';
import { CheckoutService } from 'src/checkout/checkout.service';
import { Product } from 'src/products/entities/product.entity';
import { InvoicesService } from 'src/invoices/invoices.service';
import { InvoiceResponseDto } from 'src/invoices/dto/invoice.response.dto';
import { Payment } from 'src/payments/entities/payment.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    private readonly checkoutService: CheckoutService,
    private readonly invoiceService: InvoicesService,
  ) {}

  async create(
    createOrderDto: CreateOrderDto,
    user: UserDto,
  ): Promise<IResponse<InvoiceResponseDto>> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let invoice = new Invoice();

    //calculate the total price of the order
    const summary =
      await this.checkoutService.calculateCheckoutSummary(createOrderDto);

    try {
      // create invoice
      invoice = queryRunner.manager.create(Invoice, {
        user,
        totalAmount: summary.totalAmount,
        invoiceId: generateCustomId(PREFIX_GENERATED_ID.INVOICE),
      });

      // save invoice
      await queryRunner.manager.save(invoice);

      //loop seller-level order
      for (const sellerOrder of summary.orders) {
        //create order
        const order = queryRunner.manager.create(Order, {
          invoice,
          sellerId: sellerOrder.sellerId,
          user,
          orderId: generateCustomId(PREFIX_GENERATED_ID.ORDER),
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

      //create payment, reserve when creating invoice
      const payment = queryRunner.manager.create(Payment, {
        amount: summary.totalAmount,
        externalId: invoice.invoiceId,
        invoice,
      });

      //save payment
      await queryRunner.manager.save(payment);

      //commit transaction
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }

    return await this.invoiceService.findOne(invoice.id);
  }

  async findAll(
    user: UserDto,
    page: number,
    limit: number,
  ): Promise<IResponse<OrderDto>> {
    const skip = (page - 1) * limit; //offset
    const [orders, total] = await this.orderRepository.findAndCount({
      where: {
        user: {
          id: user.id,
        },
      },
      take: limit,
      skip,
      order: { createdAt: 'DESC' }, // optional: latest first
      relations: ['items', 'items.product'],
    });

    const pagination = calculatePagination(total, page, limit);
    return formatResponse(orders, OrderDto, pagination);
  }

  async findOne(user: UserDto, id: number): Promise<IResponse<OrderDto>> {
    const order = await this.orderRepository.findOne({
      where: { user: { id: user.id }, id },
      relations: ['items', 'items.product', 'invoice', 'invoice.payment'],
    });

    if (!order) throw new Error(`Order ID ${id} not found`);
    console.log(order);

    return formatResponse(order, OrderDto);
  }

  update(id: number) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
