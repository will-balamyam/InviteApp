import {CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor} from '@nestjs/common';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
        catchError((error) => {
          const status =
              error instanceof HttpException
                  ? error.getStatus()
                  : HttpStatus.INTERNAL_SERVER_ERROR;

          const response = {
            code: status,
            message: error.message || 'Internal server error',
            data: null,
          };

          return throwError(() => response);
        }),
    );
  }
}
