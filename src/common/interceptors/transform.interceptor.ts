import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPagination, IResponse } from 'src/shared/interfaces/response';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    return next.handle().pipe(
      map((response: { data: T; pagination?: IPagination }) => {
        const { data, pagination } = response;

        return {
          statusCode: context
            .switchToHttp()
            .getResponse<{ statusCode: number }>().statusCode,
          data,
          pagination: pagination || null, // fallback if response doesn't have pagination
        };
      }),
    );
  }
}
