import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { IDelete, IResponse } from 'src/shared/interfaces/response';
import { Product } from './entities/product.entity';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { formatResponse } from 'src/common/helpers/format-response';
import { calculatePagination } from 'src/common/helpers/calculate-pagination';

@Injectable()
export class ProductsService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: ProductDto): Promise<IResponse<ProductDto>> {
    const product = plainToInstance(Product, createProductDto);
    const createdProduct = await this.productRepository.save(product);
    return formatResponse(createdProduct, ProductDto);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<IResponse<ProductDto>> {
    const skip = (page - 1) * limit; //offset
    const [products, total] = await this.productRepository.findAndCount({
      take: limit,
      skip,
    });

    const pagination = calculatePagination(total, page, limit);

    return formatResponse(products, ProductDto, pagination);
  }

  async findOne(id: number): Promise<IResponse<ProductDto>> {
    const product = await this.productRepository.findOneBy({ id });
    return formatResponse(product, ProductDto);
  }

  async update(
    id: number,
    updateProductDto: ProductDto,
  ): Promise<IResponse<ProductDto>> {
    const product = plainToInstance(Product, updateProductDto);
    const updatedProduct = await this.productRepository.update(id, product);
    return formatResponse(updatedProduct, ProductDto);
  }

  async remove(id: number): Promise<IResponse<IDelete>> {
    const deletedUser = await this.productRepository.delete(id);

    if (deletedUser.affected === 0) {
      return formatResponse({ affected: 0, message: 'User not found' });
    }
    return formatResponse({ affected: deletedUser.affected });
  }
}
