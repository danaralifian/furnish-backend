import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentDto } from './dto/payments.dto';
import { CreateBillDto } from './dto/create-bill.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-bill-test')
  createBillTest(@Body() createBill: CreateBillDto) {
    return this.paymentsService.createBillTest(createBill);
  }

  @Post('create-manual-payment')
  createManualBill(@Body() createPaymentDto: PaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }
}
