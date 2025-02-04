import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login.component';
import { RegisterComponent } from './authentication/components/register/register.component';
import { HomeComponent } from './authentication/components/home/home.component';
import { authGuard } from './authentication/services/auth.guard';
import { ForgotPasswordComponent } from './authentication/components/forgotpassword/forgotpassword.component';
import { RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './authentication/components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './authentication/components/user-dashboard/user-dashboard.component';
// import { CabServiceProviderComponent } from './authentication/components/cab-service-provider/cab-service-provider.component';
// import { HotelServiceProviderComponent } from './authentication/components/hotel-service-provider/hotel-service-provider.component';
// import { FlightServiceProviderComponent } from './authentication/components/flight-service-provider/flight-service-provider.component';
// import { TourServiceProviderComponent } from './authentication/components/tour-service-provider/tour-service-provider.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'user-dashboard', component: UserDashboardComponent },
  { path: 'cab-service-provider', component: HomeComponent, canActivate: [authGuard] },
  { path: 'hotel-service-provider', component: HomeComponent, canActivate: [authGuard] },
  { path: 'flight-service-provider', component: HomeComponent, canActivate: [authGuard] },
  { path: '   tour-service-provider', component: HomeComponent, canActivate: [authGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/login' }, // Fallback route for unmatched paths
];
