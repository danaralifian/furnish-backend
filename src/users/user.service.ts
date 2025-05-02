import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { calculatePagination } from 'src/common/helpers/calculate-pagination';

import { instanceToPlain } from 'class-transformer';
import { UserDto } from './dto/user.dto';
import { IDelete, IResponse } from 'src/shared/interfaces/response';
import { formatResponse } from 'src/common/helpers/format-response';

@Injectable()
export class UserService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * this is function is used to create User in User Entity.
   * @param createUserDto this will type of createUserDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of user
   */
  async create(createUserDto: UserDto): Promise<IResponse<UserDto>> {
    const user = instanceToPlain(createUserDto);
    const createdUser = await this.userRepository.save(user);
    return formatResponse(createdUser, UserDto);
  }

  /**
   * this function is used to get all the user's list
   * @returns promise of array of users
   */
  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<IResponse<UserDto>> {
    const skip = (page - 1) * limit; //offset

    const [users, total] = await this.userRepository.findAndCount({
      take: limit,
      skip,
    });
    const pagination = calculatePagination(total, page, limit);

    return formatResponse(users, UserDto, pagination);
  }

  async findOne(id: number): Promise<IResponse<UserDto>> {
    const user = await this.userRepository.findOneBy({ id });
    return formatResponse(user, UserDto);
  }

  /**
   * this function is used to updated specific user whose id is passed in
   * parameter along with passed updated data
   * @param id is type of number, which represent the id of user.
   * @param updateUserDto this is partial type of createUserDto.
   * @returns promise of udpate user
   */
  async update(
    id: number,
    updateUserDto: UserDto,
  ): Promise<IResponse<UserDto>> {
    const user = instanceToPlain(updateUserDto);
    await this.userRepository.update(id, user);
    const updatedUser = await this.userRepository.findOneBy({ id });

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return formatResponse(updatedUser, UserDto);
  }

  /**
   * this function is used to remove or delete user from database.
   * @param id is the type of number, which represent id of user
   * @returns nuber of rows deleted or affected
   */
  async remove(id: number): Promise<IResponse<IDelete>> {
    const deletedUser = await this.userRepository.delete(id);

    if (deletedUser.affected === 0) {
      return formatResponse({ affected: 0, message: 'User not found' });
    }
    return formatResponse({ affected: deletedUser.affected });
  }
}
