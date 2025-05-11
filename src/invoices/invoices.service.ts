import { Injectable } from '@nestjs/common';
import { IResponse } from 'src/shared/interfaces/response';
import { InvoiceResponseDto } from 'src/invoices/dto/invoice.response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Repository } from 'typeorm';
import { formatResponse } from 'src/common/helpers/format-response';
import { InvoiceDto } from './dto/invoice.dto';
import { UserDto } from 'src/users/dto/user.dto';
import { calculatePagination } from 'src/common/helpers/calculate-pagination';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  async findAll(
    user: UserDto,
    page: number,
    limit: number,
  ): Promise<IResponse<InvoiceDto>> {
    const skip = (page - 1) * limit; //offset
    const [invoices, total] = await this.invoiceRepository.findAndCount({
      where: {
        user: {
          id: user.id,
        },
      },
      take: limit,
      skip,
      relations: ['user'],
    });

    const pagination = calculatePagination(total, page, limit);

    return formatResponse(invoices, InvoiceDto, pagination);
  }

  async findOne(id: number): Promise<IResponse<InvoiceResponseDto>> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['orders', 'orders.items', 'orders.items.product', 'payment'],
    });

    return formatResponse(invoice, InvoiceResponseDto);
  }
}
