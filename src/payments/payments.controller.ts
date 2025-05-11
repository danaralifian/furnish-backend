import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentDto } from './dto/payments.dto';
import { CreateBillDto } from './dto/create-bill.dto';
import { paymentWebhookDto } from './dto/payment-webhook.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-bill-test')
  createBillTest(@Body() createBill: CreateBillDto) {
    return this.paymentsService.createBillTest(createBill);
  }

  @Post('create-manual-bill')
  createManualBill(@Body() createPaymentDto: PaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Post('webhook/make-bill') //webhook from supabase
  makeBill(@Body() paymentWebhook: paymentWebhookDto) {
    return this.paymentsService.makeBill(paymentWebhook.record);
  }
}
