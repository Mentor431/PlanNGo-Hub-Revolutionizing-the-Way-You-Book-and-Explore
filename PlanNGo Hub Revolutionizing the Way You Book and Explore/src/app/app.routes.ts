import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login.component';
import { RegisterComponent } from './authentication/components/register/register.component';
import { HomeComponent } from './authentication/components/home/home.component';
import { authGuard } from './authentication/services/auth.guard';
import { ForgotPasswordComponent } from './authentication/components/forgotpassword/forgotpassword.component';
import { RouterModule  } from '@angular/router';
import { AdminDashboardComponent } from './authentication/components/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'admin-dashboard', component: AdminDashboardComponent }, 
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/login' }, // Fallback route for unmatched paths
];
