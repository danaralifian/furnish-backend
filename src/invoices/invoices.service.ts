import { Injectable } from '@nestjs/common';
import { IResponse } from 'src/shared/interfaces/response';
import { InvoiceResponseDto } from 'src/invoices/dto/invoice.response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';
import { formatResponse } from 'src/common/helpers/format-response';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  findAll() {
    return `This action returns all invoices`;
  }

  async findOne(id: number): Promise<IResponse<InvoiceResponseDto>> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['orders', 'orders.items', 'orders.items.product', 'payment'],
    });

    return formatResponse(invoice, InvoiceResponseDto);
  }
}
