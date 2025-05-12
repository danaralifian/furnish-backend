import { Expose, Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { BaseDto } from 'src/shared/dto/base.dto';
import { UserDto } from 'src/users/dto/user.dto';

export class AddressDto extends BaseDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  recipientName: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  addressLine: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  city: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  province: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @Expose()
  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}
