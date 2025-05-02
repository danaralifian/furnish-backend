import { Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { instanceToPlain } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { IDelete, IResponse } from 'src/shared/interfaces/response';
import { formatResponse } from 'src/common/helpers/format-response';
import { calculatePagination } from 'src/common/helpers/calculate-pagination';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(
    createCategoryDto: CategoryDto,
  ): Promise<IResponse<CategoryDto>> {
    const category = instanceToPlain(createCategoryDto);
    const createdCategory = await this.categoryRepository.save(category);

    return formatResponse(createdCategory, CategoryDto);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<IResponse<CategoryDto>> {
    const skip = (page - 1) * limit; //offset

    const [categories, total] = await this.categoryRepository.findAndCount({
      take: limit,
      skip,
    });

    const pagination = calculatePagination(total, page, limit);

    return formatResponse(categories, CategoryDto, pagination);
  }

  async findOne(id: number): Promise<IResponse<CategoryDto>> {
    const category = await this.categoryRepository.findOneBy({ id });
    return formatResponse(category, CategoryDto);
  }

  async update(
    id: number,
    updateCategoryDto: CategoryDto,
  ): Promise<IResponse<CategoryDto>> {
    const category = instanceToPlain(updateCategoryDto);
    const updatedCategory = await this.categoryRepository.update(id, category);
    return formatResponse(updatedCategory, CategoryDto);
  }

  async remove(id: number): Promise<IResponse<IDelete>> {
    const deletedUser = await this.categoryRepository.delete(id);

    if (deletedUser.affected === 0) {
      return formatResponse({ affected: 0, message: 'Category not found' });
    }
    return formatResponse({ affected: deletedUser.affected });
  }
}
