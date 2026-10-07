import { HttpInterceptorFn } from '@angular/common/http';
import {BehaviorSubject, finalize} from 'rxjs';

const isLoading = new BehaviorSubject<boolean>(false);

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  isLoading.next(true);
  return next(req).pipe(
    finalize(() => isLoading.next(false))
  );
};

export const getLoadingState = () => isLoading.asObservable();
