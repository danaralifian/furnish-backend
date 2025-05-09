import { Injectable } from '@nestjs/common';
import {
  CheckoutDto,
  CheckoutItem,
  CheckoutOrderDto,
  CheckoutResponseDto,
} from './dto/checkout.dto';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { formatResponse } from 'src/common/helpers/format-response';
import { IResponse } from 'src/shared/interfaces/response';
import { TAX } from 'src/shared/constants/payment-fee';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async calculateCheckoutSummary(
    checkoutDto: CheckoutDto,
  ): Promise<CheckoutResponseDto> {
    const orders: CheckoutOrderDto[] = [];
    let totalAmount = 0;

    //loop orders by seller
    for (const order of checkoutDto.orders) {
      let subTotal = 0;
      const itemDetails: CheckoutItem[] = [];

      //loop order.items by items seller
      for (const item of order.items) {
        const product = await this.productRepository.findOne({
          where: { id: item.productId },
        });

        if (!product) throw new Error(`Product ID ${item.productId} not found`);

        const unitPrice = Number(product.price);
        const quantity = item.quantity;
        const totalPrice = unitPrice * quantity;
        subTotal += totalPrice;
        itemDetails.push({
          productId: item.productId,
          name: product.name,
          unitPrice,
          quantity: quantity,
          total: totalPrice,
        });
      }

      const taxFee = subTotal * TAX;
      const total = subTotal + taxFee;

      orders.push({
        items: itemDetails,
        sellerId: order.sellerId,
        subTotal,
        tax: taxFee,
        total,
      });

      totalAmount += total;
    }

    return {
      orders,
      totalAmount,
    };
  }

  async checkoutSummary(
    checkoutDto: CheckoutDto,
  ): Promise<IResponse<CheckoutResponseDto>> {
    const summary = await this.calculateCheckoutSummary(checkoutDto);
    return formatResponse(summary, CheckoutResponseDto);
  }
}
