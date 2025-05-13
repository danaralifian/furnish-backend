import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Invoice } from '../invoices/entities/invoice.entity';
import { OrderItem } from './entities/order-item.entity';
import { CheckoutModule } from 'src/checkout/checkout.module';
import { InvoicesModule } from 'src/invoices/invoices.module';
import { OrderShipping } from './entities/order-shippings';
import { AddressesModule } from 'src/addresses/addresses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice]),
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([OrderItem]),
    TypeOrmModule.forFeature([OrderShipping]),
    CheckoutModule,
    InvoicesModule,
    AddressesModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
