import { Injectable } from '@nestjs/common';
import { PaymentDto } from './dto/payments.dto';

@Injectable()
export class PaymentsService {
  create(createPaymentDto: PaymentDto) {
    console.log(createPaymentDto);
    return 'This action adds a new payment';
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: PaymentDto) {
    console.log(updatePaymentDto);
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
