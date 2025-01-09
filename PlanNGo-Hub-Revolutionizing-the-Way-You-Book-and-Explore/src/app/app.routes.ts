// import { Routes } from '@angular/router';
// import { LoginComponent } from './components/login/login.component';
// import { RegisterComponent } from './components/register/register.component';
// import { HomeComponent } from './components/home/home.component';
// import { authGuard } from './guards/auth.guard';
// import { ForgotPasswordComponent } from './components/forgotpassword/forgotpassword.component';

// export const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'home', component: HomeComponent, canActivate: [authGuard] },
//   { path: 'forgotpassword', component: ForgotPasswordComponent },
//   { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
//   { path: '**', redirectTo: '/login' }, // Fallback route for unmatched paths
  
// ];
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { ForgotPasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { RouterModule  } from '@angular/router';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/login' }, // Fallback route for unmatched paths
  
];