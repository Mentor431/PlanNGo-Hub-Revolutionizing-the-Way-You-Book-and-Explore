import { Routes } from '@angular/router';
import { CabSearchComponent } from './cab/components/cab-search/cab-search.component';
import { CabDetailsComponent } from './cab/components/cab-details/cab-details.component';
import { CabBookingComponent } from './cab/components/cab-booking/cab-booking.component';
//import {CabHomeComponent} from './cab/components/cab-home/cab-home.component';


export const routes: Routes = [
  { path: '', component: CabSearchComponent },
  { path: 'cab-details/:id', component: CabDetailsComponent },
  { path: 'cab-booking/:id', component: CabBookingComponent },
  //{ path: '', component: CabHomeComponent }


];
