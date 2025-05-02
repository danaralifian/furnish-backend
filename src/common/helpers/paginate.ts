import { IPagination, IResponse } from 'src/shared/interfaces/response';

export function paginate<T>(
  data: T,
  pagination?: IPagination,
): Promise<IResponse<T>> {
  return Promise.resolve({
    data,
    pagination,
  });
}
