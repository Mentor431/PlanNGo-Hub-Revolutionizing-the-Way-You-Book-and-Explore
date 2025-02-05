import { Routes } from '@angular/router';

// #region Flight
import { FlightComponent } from './flight/components/flight/flight.component';
import { BookingComponent } from './flight/components/booking/booking.component';
import { SeatComponent } from './flight/components/seat/seat.component';
import { HistoryComponent } from './flight/components/history/history.component';
import { DemopageForFlightComponent } from './flight/components/demopage-for-flight/demopage-for-flight.component';
import { AdminPanelComponent } from './flight/components/admin-panel/admin-panel.component';
import { AdminHistoryComponent } from './flight/components/admin-history/admin-history.component';
import { FlightAdminDashboardComponent } from './flight/components/flight-admin-dashboard/flight-admin-dashboard.component';
import { TicketComponent } from './flight/components/ticket/ticket.component';
import { FlightServiceProviderDashboardComponent } from './flight/components/flight-service-provider/flight-service-provider.component';

//#endregion


//#endregion

export const routes: Routes = [



  // Flight Routes
  { path: '', component: DemopageForFlightComponent },
  {
    path: 'flight',
    children: [
      { path: 'search', component: FlightComponent },
      { path: 'booking/:id', component: BookingComponent },
      { path: 'seat/:id', component: SeatComponent },
      { path: 'flight-ticket', component:TicketComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'service-provider', component: FlightServiceProviderDashboardComponent }, 
    ],
  },
  {
    path: 'flight-admin',
    children: [
      { path: 'panel', component: AdminPanelComponent },
      {
        path: 'Flight-admin-dashboard',
        component: FlightAdminDashboardComponent,
      },
      { path: 'adminHistory', component: AdminHistoryComponent },
    ],
  },
];
