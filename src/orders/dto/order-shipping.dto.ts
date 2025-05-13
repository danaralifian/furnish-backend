import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { BaseDto } from 'src/shared/dto/base.dto';

export class OrderShippingDto extends BaseDto {
  @Expose()
  @IsString()
  recipientName: string;

  @Expose()
  @IsString()
  phoneNumber: string;

  @Expose()
  @IsString()
  addressLine: string;

  @Expose()
  @IsString()
  city: string;

  @Expose()
  @IsString()
  province: string;

  @Expose()
  @IsString()
  postalCode: string;
}
