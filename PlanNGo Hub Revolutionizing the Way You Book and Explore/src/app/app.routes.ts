import { Routes } from "@angular/router";
import { HomepageComponent } from "./tour/components/homepage/homepage.component";
import { TourInfoComponent } from "./tour/components/tour-info/tour-info.component";
import { BookingFormComponent } from "./tour/components/tour-booking/tour-booking.component";
import { MyBookingsComponent } from "./tour/components/my-bookings/my-bookings.component";
import { SuperAdminDashboardComponent } from "./tour/components/super-admin-dashboard/super-admin-dashboard.component";
import { SuperAdminAgencyManagementComponent } from "./tour/components/super-admin-agency-management/super-admin-agency-management.component";
import { AgencyAdminManagementComponent } from './tour/components/agency-admin-management/agency-admin-management.component';
import { DemopageComponent } from "./tour/components/demopage/demopage.component";

export const routes: Routes = [
  { path: "", component: DemopageComponent },

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
