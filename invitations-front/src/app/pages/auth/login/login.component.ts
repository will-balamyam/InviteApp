import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {ApiInvitationsService} from '../../../shared/services/api-invitations.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {UserSessionService} from '../../../shared/services/user-session.service';
import {take, takeUntil} from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // This component can be used to handle user login functionality.
  // It can include methods for form submission, validation, and interaction with the authentication service.
  // For now, it's a placeholder and can be expanded later as needed.
    private router = inject(Router);
    private apiService = inject(ApiInvitationsService);
    private userSessionService = inject(UserSessionService);
    private toastService = inject(ToastrService);
    public formLogin = new FormGroup({
      user: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });


    login(): void {
      if (this.formLogin.valid) {
        const body = this.formLogin.value;
        this.apiService.login(body.user, body.password).pipe(take(1)).subscribe({
          next: (response) => {
            if (response.code === 200) {
              this.userSessionService.setSession(response.data);
              this.toastService.success('Login successful', 'Success');
              // Assuming the response contains user data
              this.router.navigate(['/admin/invitations']);
            } else {
              this.toastService.error(response.message, 'Error');
            }
          },
          error: (error) => {
            this.toastService.error('An error occurred during login', 'Error');
            console.error('Login error:', error);
          }
        });
      } else {
        this.toastService.warning('Please fill in all required fields', 'Warning');
      }
    }

}
