import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutDto } from './dto/checkout.dto';
@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  @HttpCode(200)
  checkoutSummary(@Body() checkoutDto: CheckoutDto) {
    return this.checkoutService.checkoutSummary(checkoutDto);
  }
}
