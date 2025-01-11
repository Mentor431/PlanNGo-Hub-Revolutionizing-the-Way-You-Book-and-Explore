// src/app/cab/components/cab-booking.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CabService } from '../../services/cab.service'; 
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http'; 

@Component({
  selector: 'app-cab-booking',
  templateUrl: './cab-booking.component.html',
  styleUrls: ['./cab-booking.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule], 
  providers: [CabService]
})
export class CabBookingComponent implements OnInit {
  cabId: string = ''; // Cab ID for the selected cab
  cab: any = null;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cabService: CabService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.cabId = params['id']; // Retrieve the cab ID from the route parameters
      this.loadCabDetails();
    });
  }

  loadCabDetails(): void {
    this.cabService.getCabById(this.cabId).subscribe(
      (data) => {
        if (data.length > 0) {
          this.cab = data[0];
        } else {
          this.error = 'Cab not found';
        }
      },
      (error) => {
        this.error = 'Failed to load cab details';
      }
    );
  }
  back():void{
    this.router.navigate(['/']); //goes back to the booking page(home page)
  }
}
