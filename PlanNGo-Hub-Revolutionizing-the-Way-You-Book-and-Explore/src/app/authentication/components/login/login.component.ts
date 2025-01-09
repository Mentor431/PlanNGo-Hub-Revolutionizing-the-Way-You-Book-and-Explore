// import { Component, inject } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ButtonModule } from 'primeng/button';
// import { CardModule } from 'primeng/card';
// import { InputTextModule } from 'primeng/inputtext';
// import { PasswordModule } from 'primeng/password';
// import { AuthService } from '../../services/auth.service';
// import { MessageService } from 'primeng/api';
// import { CommonModule } from '@angular/common';


// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [
//     CardModule,
//     InputTextModule,
//     FormsModule,
//     PasswordModule,
//     CommonModule,
//     ButtonModule,
//   ],
//   templateUrl: './login.component.html',
// })
// export class LoginComponent {
//   login = { email: '', password: '' };
//   email = '';
//   showForgotPassword = false;

//   private authService = inject(AuthService);
//   private router = inject(Router);
//   private messageService = inject(MessageService);

//   onLogin() {
//   const { email, password } = this.login;
//   this.authService.getUserDetails(email, password).subscribe({
//     next: (response) => {
//       if (response.length > 0) {
//         const user = response[0];
//         sessionStorage.setItem('userId', user.id); // Ensure this matches authGuard check
//         this.router.navigate(['/home']);
//       } else {
//         this.messageService.add({
//           severity: 'error',
//           summary: 'Login Failed',
//           detail: 'Invalid credentials',
//         });
//       }
//     },
//     error: () => {
//       this.messageService.add({
//         severity: 'error',
//         summary: 'Error',
//         detail: 'Something went wrong',
//       });
//     },
//   });
//   }
// }
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faUserLock } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    CommonModule,
    FontAwesomeModule,
    ButtonModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  login = { email: '', password: '' };
  email = '';
  showForgotPassword = false;

  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  faUserLock = faUserLock;
  faEnvelope = faEnvelope;
  faLock = faLock;

  onLogin() {
    const { email, password } = this.login;

    // Log the login attempt for debugging
    console.log('Login initiated:', { email, password });

    this.authService.getUserDetails(email, password).subscribe({
      next: (response) => {
        // Debug API response
        console.log('API Response:', response);

        if (response.length > 0) {
          const user = response[0];
          

          // Save user ID in sessionStorage
          sessionStorage.setItem('userId', user.id);
          console.log('User ID saved in sessionStorage:', sessionStorage.getItem('userId'));

          // Optional: Save email if required in authGuard or elsewhere
          sessionStorage.setItem('email', user.email);

          // Navigate to home page
          this.router.navigate(['/home']).then((success) => {
            if (success) {
              console.log('Navigation to home successful');
            } else {
              console.error('Navigation to home failed');
            }
          });
        } else {
          // Show error message if credentials are invalid
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: 'Invalid email or password',
          });
        }
      },
      error: (err) => {
        // Handle API errors
        console.error('API Error:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Unable to log in. Please try again later.',
        });
      },
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  navigateToForgotpassword() {
    this.router.navigate(['/forgotpassword']);
  }
}