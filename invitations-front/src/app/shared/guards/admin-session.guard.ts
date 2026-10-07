import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserSessionService} from '../services/user-session.service';
import {ToastrService} from 'ngx-toastr';

export const adminSessionGuard: CanActivateFn = (route, state) => {
  const userSessionService = inject(UserSessionService);
  const router = inject(Router);
  const toastService = inject(ToastrService);

  const isRootRoute = state.url === '/';

  if (!userSessionService.isAuthenticated()) {
    toastService.error('You must be logged in to access this page.');
    router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  } else if (isRootRoute) {
    router.navigate(['/admin/invitations']);
    return false;
  }

  return true;
};
