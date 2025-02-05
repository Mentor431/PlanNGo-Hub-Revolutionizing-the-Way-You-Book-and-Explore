import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import { faHotel } from '@fortawesome/free-solid-svg-icons';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
import { faSuitcase } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FontAwesomeModule, ButtonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = "PlanNGo-Hub";

  faCar = faCar;
  faHotel = faHotel;
  faPlane = faPlane;
  faSuitcase = faSuitcase;

}
