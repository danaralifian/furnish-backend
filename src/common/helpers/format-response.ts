import {
  ClassConstructor,
  ClassTransformOptions,
  plainToInstance,
} from 'class-transformer';
import { IPagination, IResponse } from 'src/shared/interfaces/response';

export function formatResponse<T>(
  data: unknown,
  dto?: ClassConstructor<T>,
  pagination?: IPagination,
  options?: ClassTransformOptions,
): Promise<IResponse<T>> {
  const transformedData = dto
    ? plainToInstance(dto, data, {
        excludeExtraneousValues: true,
        ...options,
      })
    : (data as T);

  return Promise.resolve({
    data: transformedData,
    pagination,
  });
}
