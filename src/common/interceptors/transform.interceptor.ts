import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse } from 'src/shared/interfaces/response';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    return next.handle().pipe(
      map((response) => {
        const { data, pagination } = response;

        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          data,
          pagination: pagination || null, // fallback if response doesn't have pagination
        };
      }),
    );
  }
}
