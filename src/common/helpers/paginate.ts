import { IPagination, IResponse } from 'src/shared/interfaces/response';

export async function paginate<T>(
  data: T,
  pagination?: IPagination,
): Promise<IResponse<T>> {
  return {
    data,
    pagination,
  };
}
