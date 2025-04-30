import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { IResponse } from 'src/shared/interfaces/response';
import { Product } from './entities/product.entity';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { paginate } from 'src/common/helpers/paginate';
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

  async create(createProductDto: ProductDto): Promise<IResponse<Product>> {
    const product = plainToInstance(Product, createProductDto);
    const createdProduct = await this.productRepository.save(product);
    return paginate(createdProduct);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<IResponse<Product[]>> {
    const skip = (page - 1) * limit; //offset
    const [products, total] = await this.productRepository.findAndCount({
      take: limit,
      skip,
    });

    const pagination = calculatePagination(total, page, limit);

    return paginate(products, pagination);
  }

  async findOne(id: number): Promise<IResponse<Product | null>> {
    const product = await this.productRepository.findOneBy({ id });
    return paginate(product);
  }

  async update(
    id: number,
    updateProductDto: ProductDto,
  ): Promise<IResponse<UpdateResult>> {
    const product = plainToInstance(Product, updateProductDto);
    const updatedProduct = await this.productRepository.update(id, product);
    return paginate(updatedProduct);
  }

  async remove(
    id: number,
  ): Promise<IResponse<{ affected?: number | null; message?: string }>> {
    const deletedUser = await this.productRepository.delete(id);

    if (deletedUser.affected === 0) {
      return paginate({ affected: 0, message: 'User not found' });
    }
    return paginate({ affected: deletedUser.affected });
  }
}
