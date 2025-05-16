import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutDto } from './dto/checkout.dto';
import { ApiOperation } from '@nestjs/swagger';
@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Checkout summary' })
  checkoutSummary(@Body() checkoutDto: CheckoutDto) {
    return this.checkoutService.checkoutSummary(checkoutDto);
  }
}
