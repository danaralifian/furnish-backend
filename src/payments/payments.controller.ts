import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentDto } from './dto/payments.dto';
import { CreatePaymentInvoiceDto } from './dto/create-payment-invoice.dto';
import { PaymentWebhookDto } from './dto/payment-webhook.dto';
import { PaymentGatewayWebhookDto } from './dto/payment-gateway-webhook.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-test')
  createPaymentTest(@Body() createPayment: CreatePaymentInvoiceDto) {
    return this.paymentsService.createPaymentTest(createPayment);
  }

  @Post('create-manual')
  createManualBill(@Body() createPaymentDto: PaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @HttpCode(200)
  @Post('webhook/create-invoice') //webhook supabase, to create payment invoice
  processSupabasePayment(@Body() payment: PaymentWebhookDto) {
    return this.paymentsService.processSupabasePayment(payment.record);
  }

  @HttpCode(200)
  @Post('webhook/xendit') //webhook xendit
  webhookXendit(@Body() payment: PaymentGatewayWebhookDto) {
    return this.paymentsService.webhookPayment(payment);
  }
}
