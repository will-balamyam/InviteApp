import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import {map, Observable} from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
        map((response) => ({
          code: response.data ? 200 : 400,
          message: response.message || '',
          data: response.data,
        })),
    );
  }
}
