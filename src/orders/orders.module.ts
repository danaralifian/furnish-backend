import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Invoice } from './entities/invoice.entity';
import { OrderItem } from './entities/order-item.entity';
import { CheckoutModule } from 'src/checkout/checkout.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice]),
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([OrderItem]),
    CheckoutModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
