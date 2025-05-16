import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentDto } from './dto/payments.dto';
import { CreatePaymentInvoiceDto } from './dto/create-payment-invoice.dto';
import { PaymentWebhookDto } from './dto/payment-webhook.dto';
import { PaymentGatewayWebhookDto } from './dto/payment-gateway-webhook.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-test')
  @ApiOperation({ summary: 'Create test payment invoice' })
  createPaymentTest(@Body() createPayment: CreatePaymentInvoiceDto) {
    return this.paymentsService.createPaymentTest(createPayment);
  }

  @Post('create-manual')
  @ApiOperation({ summary: 'Create manual payment invoice' })
  createManualBill(@Body() createPaymentDto: PaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @HttpCode(200)
  @Post('webhook/create-invoice') //webhook supabase, to create payment invoice
  @ApiOperation({ summary: 'Create payment invoice from webhook' })
  processSupabasePayment(@Body() payment: PaymentWebhookDto) {
    return this.paymentsService.processSupabasePayment(payment.record);
  }

  @HttpCode(200)
  @Post('webhook/xendit') //webhook xendit
  @ApiOperation({ summary: 'Process xendit payment webhook' })
  webhookXendit(@Body() payment: PaymentGatewayWebhookDto) {
    return this.paymentsService.webhookPayment(payment);
  }
}
