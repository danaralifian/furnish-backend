import { Injectable } from '@nestjs/common';
import { AddressDto } from './dto/address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDelete, IResponse } from 'src/shared/interfaces/response';
import { formatResponse } from 'src/common/helpers/format-response';
import { instanceToPlain } from 'class-transformer';
import { UserDto } from 'src/users/dto/user.dto';
import { getUnixTimestamp } from 'src/common/helpers/time';
import { Address } from './entities/address.entity';
import { calculatePagination } from 'src/common/helpers/calculate-pagination';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(
    user: UserDto,
    createAddressDto: AddressDto,
  ): Promise<IResponse<AddressDto>> {
    const address = await this.addressRepository.save(
      instanceToPlain({
        ...createAddressDto,
        user,
      }),
    );

    return formatResponse(address, AddressDto);
  }

  async findAll(
    user: UserDto,
    page: number,
    limit: number,
  ): Promise<IResponse<AddressDto>> {
    const skip = (page - 1) * limit; //offset
    const [products, total] = await this.addressRepository.findAndCount({
      where: { user: { id: user.id } },
      take: limit,
      skip,
    });

    const pagination = calculatePagination(total, page, limit);

    return formatResponse(products, AddressDto, pagination);
  }

  async findOne(id: number, user: UserDto): Promise<IResponse<AddressDto>> {
    const address = await this.addressRepository.findOneBy({
      id,
      user: { id: user.id },
    });

    return formatResponse(address, AddressDto);
  }

  async update(
    id: number,
    user: UserDto,
    updateAddressDto: AddressDto,
  ): Promise<IResponse<AddressDto>> {
    await this.addressRepository.update(
      {
        id,
        user: {
          id: user.id,
        },
      },
      instanceToPlain(updateAddressDto),
    );
    const address = await this.addressRepository.findOneBy({ id });

    if (!address) {
      throw new Error('Address not found');
    }

    return formatResponse(address, AddressDto);
  }

  async remove(id: number, user: UserDto): Promise<IResponse<IDelete>> {
    await this.addressRepository.update(
      {
        id,
        user: {
          id: user.id,
        },
      },
      {
        deletedAt: getUnixTimestamp(),
      },
    );

    const address = await this.addressRepository.findOneBy({ id });

    if (!address) {
      throw new Error('Address not found');
    }

    return formatResponse({});
  }
}
