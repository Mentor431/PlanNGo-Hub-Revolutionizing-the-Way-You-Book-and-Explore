
import { Routes } from "@angular/router";

// authentication
import { LoginComponent } from './authentication/components/login/login.component';
import { RegisterComponent } from './authentication/components/register/register.component';
import { HomeComponent } from './authentication/components/home/home.component';
import { authGuard } from './authentication/services/auth.guard';
import { ForgotPasswordComponent } from './authentication/components/forgotpassword/forgotpassword.component';
import { AdminDashboardComponent } from './authentication/components/admin-dashboard/admin-dashboard.component';

// tours
import { HomepageComponent } from "./tour/components/homepage/homepage.component";
import { TourInfoComponent } from "./tour/components/tour-info/tour-info.component";
import { BookingFormComponent } from "./tour/components/tour-booking/tour-booking.component";
import { MyBookingsComponent } from "./tour/components/my-bookings/my-bookings.component";
import { SuperAdminDashboardComponent } from "./tour/components/super-admin-dashboard/super-admin-dashboard.component";
import { SuperAdminAgencyManagementComponent } from "./tour/components/super-admin-agency-management/super-admin-agency-management.component";
import { AgencyAdminManagementComponent } from './tour/components/agency-admin-management/agency-admin-management.component';
import { DemopageComponent } from "./tour/components/demopage/demopage.component";

export const routes: Routes = [
  
  // authentication
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'admin-dashboard', component: AdminDashboardComponent }, 
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', redirectTo: '/login' },
  
  // tours  
  { path : 'tour', component: DemopageComponent },
  {
    path: 'tours',
    children: [
      {
        path: 'home',
        component: HomepageComponent,
      },
      {
        path: 'package/:id',
        component: TourInfoComponent,
      },
      {
        path: 'package/:id/reserve',
        component: BookingFormComponent,
      },
      {
        path: 'my-bookings',
        component: MyBookingsComponent,
      },
      {
        path: 'superadmin',
        children:[
          {
            path: 'dashboard',
            component: SuperAdminDashboardComponent,
          },
          {
            path: 'dashboard/agencies',
            component: SuperAdminAgencyManagementComponent,
          },
        ]
      },
      {
        path: 'agencyadmin',
        children:[
          {
            path: ':agencyId/dashboard/packages',
            component: AgencyAdminManagementComponent,
          }
        ]
      }
    ]
  },
];
