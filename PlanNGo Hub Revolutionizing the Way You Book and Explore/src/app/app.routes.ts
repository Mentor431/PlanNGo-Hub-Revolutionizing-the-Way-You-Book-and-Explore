import { Routes } from '@angular/router';
import { CabSearchComponent } from './cab/components/cab-search/cab-search.component';
import { CabDetailsComponent } from './cab/components/cab-details/cab-details.component';
import { CabBookingComponent } from './cab/components/cab-booking/cab-booking.component';
import {CabHomeComponent} from './cab/components/cab-home/cab-home.component';
import{CabManageComponent}from './cab/components/cab-manage/cab-manage.component';
import{BookingHistoryComponent}from './cab/components/cab-history/cab-history.component';


export const routes: Routes = [
  { path: "", 
    component: CabHomeComponent 
  },

  { path: 'cab-search',
     component: CabSearchComponent
  },

  { path: 'cab-details/:id',
     component: CabDetailsComponent 
  },

  { path: 'manage-bookings/:id', 
    component: CabManageComponent 
  },

  { path: 'booking-history',
     component: BookingHistoryComponent
  }, 
  
  { path: 'cab-booking/:id', 
    component: CabBookingComponent
  },
];  