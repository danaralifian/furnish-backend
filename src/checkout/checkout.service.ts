import { Injectable } from '@nestjs/common';
import {
  CheckoutDto,
  CheckoutItem,
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

  async checkoutSummary(
    checkoutDto: CheckoutDto,
  ): Promise<IResponse<CheckoutResponseDto>> {
    let subtotal = 0;
    const itemDetails: CheckoutItem[] = [];

    for (const item of checkoutDto.items) {
      const product = await this.productRepository.findOne({
        where: { id: item.productId },
      });

      if (!product) throw new Error(`Product ID ${item.productId} not found`);

      const price = Number(product.price);
      const quantity = item.quantity;
      const total = price * quantity;
      subtotal += total;
      itemDetails.push({
        productId: item.productId,
        name: product.name,
        unitPrice: price,
        quantity: quantity,
        total: total,
      });
    }

    const tax = subtotal * TAX;
    const total = subtotal + tax;

    return formatResponse({
      items: itemDetails,
      subtotal,
      tax,
      total,
    });
  }
}
