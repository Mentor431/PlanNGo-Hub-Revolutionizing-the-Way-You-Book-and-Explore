import { Routes } from '@angular/router';

// authentication
import { LoginComponent } from './authentication/components/login/login.component';
import { RegisterComponent } from './authentication/components/register/register.component';
import { HomeComponent } from './authentication/components/home/home.component';
import { authGuard } from './authentication/services/auth.guard';
import { ForgotPasswordComponent } from './authentication/components/forgotpassword/forgotpassword.component';
import { AdminDashboardComponent } from './authentication/components/admin-dashboard/admin-dashboard.component';

// #region Cabs
import { CabSearchComponent } from './cab/components/cab-search/cab-search.component';
import { CabDetailsComponent } from './cab/components/cab-details/cab-details.component';
import { CabBookingComponent } from './cab/components/cab-booking/cab-booking.component';
import { CabHomeComponent } from './cab/components/cab-home/cab-home.component';
import { CabManageComponent } from './cab/components/cab-manage/cab-manage.component';
import { BookingHistoryComponent } from './cab/components/cab-history/cab-history.component';
import { AdminDriverCommunicationComponent } from './cab/components/admin-driver-communication/admin-driver-communication.component';
import { AdminManageBookingsComponent } from './cab/components/admin-manage-bookings/admin-manage-bookings.component';
// import { CabAdminDashboardComponent } from './cab/components/admin-dashboard/admin-dashboard.component';
// #endregion

//#region Hotels
import { LoginPageComponent } from './hotels/components/login-page/login-page.component';
import { SearchHotelComponent } from './hotels/components/search-hotel/search-hotel.component';
import { HotelResultsComponent } from './hotels/components/hotel-results/hotel-results.component';
import { HotelDetailsComponent } from './hotels/components/hotel-details/hotel-details.component';
import { HotelBookingComponent } from './hotels/components/hotel-booking/hotel-booking.component';
import { MyBookings_Component } from './hotels/components/my-bookings/my-bookings.component';
import { AdminHotelsComponent } from './hotels/components/admin-hotels/admin-hotels.component';
import { AdminDashboard_Component } from './hotels/components/admin-dashboard/admin-dashboard.component';
import { AdminBookingsComponent } from './hotels/components/admin-bookings/admin-bookings.component';
//#endregion

// #region Tours
import { HomepageComponent } from './tour/components/homepage/homepage.component';
import { TourInfoComponent } from './tour/components/tour-info/tour-info.component';
import { BookingFormComponent } from './tour/components/tour-booking/tour-booking.component';
import { MyBookingsComponent } from './tour/components/my-bookings/my-bookings.component';
import { SuperAdminDashboardComponent } from './tour/components/super-admin-dashboard/super-admin-dashboard.component';
import { SuperAdminAgencyManagementComponent } from './tour/components/super-admin-agency-management/super-admin-agency-management.component';
import { AgencyAdminManagementComponent } from './tour/components/agency-admin-management/agency-admin-management.component';
import { DemopageComponent } from './tour/components/demopage/demopage.component';
//#endregion

export const routes: Routes = [
  // authentication
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', redirectTo: '/login' },

  // cabs
  {
    path: 'cab',
    children: [
      {
        path: 'home',
        component: CabHomeComponent,
      },
      {
        path: 'cab-search',
        component: CabSearchComponent,
      },
      {
        path: 'cab-details/:id',
        component: CabDetailsComponent,
      },
      {
        path: 'manage-bookings/:id',
        component: CabManageComponent,
      },
      {
        path: 'booking-history',
        component: BookingHistoryComponent,
      },
      {
        path: 'cab-booking/:id',
        component: CabBookingComponent,
      },
    ],
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      // {
      //   path: 'dashboard',
      //   component: CabAdminDashboardComponent,
      // },
      {
        path: 'communication',
        component: AdminDriverCommunicationComponent,
      },
      {
        path: 'admin-manage',
        component: AdminManageBookingsComponent,
      },
    ],
  },

  // hotels
  // { path: '', component: LoginPageComponent },
  {
    path: 'hotels',
    children: [
      { path: 'search', component: SearchHotelComponent },
      { path: 'search-results', component: HotelResultsComponent },
      { path: 'hotel-details/:id', component: HotelDetailsComponent },
      { path: 'hotel-booking', component: HotelBookingComponent },
      { path: 'my-bookings', component: MyBookings_Component },
      {
        path: 'admin',
        children: [
          { path: 'hotels', component: AdminHotelsComponent },
          { path: 'dashboard', component: AdminDashboard_Component },
          { path: 'bookings', component: AdminBookingsComponent },
        ],
      },
    ],
  },

  // tours
  { path: 'tour', component: DemopageComponent },
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
        children: [
          {
            path: 'dashboard',
            component: SuperAdminDashboardComponent,
          },
          {
            path: 'dashboard/agencies',
            component: SuperAdminAgencyManagementComponent,
          },
        ],
      },
      {
        path: 'agencyadmin',
        children: [
          {
            path: ':agencyId/dashboard/packages',
            component: AgencyAdminManagementComponent,
          },
        ],
      },
    ],
  },
];
