import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { Order } from 'src/orders/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    TypeOrmModule.forFeature([Invoice]),
    TypeOrmModule.forFeature([Order]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
