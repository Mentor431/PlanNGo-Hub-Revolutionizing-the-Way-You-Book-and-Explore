import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { CabService } from '../../services/cab.service';  
import { HttpClient } from '@angular/common/http';
import { Booking ,User,cabs} from '../../models/cab-entities';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { ChangeDetectorRef } from '@angular/core';
 

@Component({
    selector: 'cab-booking-history',
    templateUrl: './cab-history.component.html',
    styleUrls: ['./cab-history.component.css'],
    standalone: true, 
    imports:[CommonModule,FormsModule],
    providers: [CabService]
})
export class BookingHistoryComponent implements OnInit {
  bookings: any[] = [];
  minDate: string;
  maxDate: string;
  dropdownOptions: string[] = [];
  dropdownOpen: boolean = false;
  isFabMenuOpen = false;
  currentBookings: any = {};
  pastBookings: any[] = [];
  isEditPopupOpen = false;
  currentBooking: any = {};
  isReviewPopupOpen = false;
  locationError = false;
  review: { rating: number, comment: string } = { rating: 1, comment: '' };
  

  openEditPopup(booking: any) {
    // this.currentBooking = { ...booking.users?.[0] }; 
    this.currentBooking = { ...booking}; 
   console.log(this.currentBooking) 
    this.isEditPopupOpen = true;
    this.locationError = false; 
  }

  closeEditPopup() {
    this.isEditPopupOpen = false;
    this.currentBooking = {}; 
  }

  constructor(
    private router: Router,
    private cabService: CabService,
    private cdr: ChangeDetectorRef
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];  
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 20);  
    this.maxDate = maxDate.toISOString().split('T')[0];
  }


  // Validate if the drop location and location are the same
  validateLocations() {
    if (this.currentBooking.cab[0].dropLocation.trim().toLowerCase() === this.currentBooking.cab[0].location.trim().toLowerCase()) {
      this.locationError = true;
    } else {
      this.locationError = false;
    }
  }

  ngOnInit() {
    this.getBookings()
  }
  
  openReviewPopup(booking: any): void {
    this.currentBooking = booking;  
    this.isReviewPopupOpen = true;   
    this.review = { rating: 1, comment: '' };  
  }
  closeReviewPopup(): void {
    this.isReviewPopupOpen = false;
  }
  submitReview(): void {
    if (this.review.rating && this.review.comment) {
      console.log('Review Submitted:', this.review);
      this.closeReviewPopup();  
    } else {
      console.error('Please fill both rating and comment');
    }
  }
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }
  toggleFabMenu(): void {
    this.isFabMenuOpen = !this.isFabMenuOpen;
  }

   
  updateBookingDetails(): void {
    if (this.currentBooking) {
      console.log('Saving booking:', this.currentBooking);
  
      const userId = this.currentBooking.id;  
      
      // const bookingIndex = this.bookings.findIndex((booking) =>
      //   booking.some((user: any) => user.id === userId)
      // );

      const bookingIndex = this.currentBooking.users.find((user: any) => user.id === userId);
       
      if (bookingIndex !== -1) {
        
        // this.bookings[bookingIndex].users = this.bookings[bookingIndex].users.map(
        //   (user: any) =>
        //     user.id === userId ? { ...user, ...this.currentBooking } : user
        // );
  
        console.log('Updated bookings:', this.bookings);
  
        this.validateLocations();
           if (this.locationError) {
             return; // Prevent form submission if there's a validation error
            }


        this.cabService.updateBooking(this.currentBooking,this.currentBooking.id).subscribe(
          (response) => {
            console.log('Booking updated successfully in DB:', response);
  
            
            this.cdr.detectChanges();
  
            
            this.closeEditPopup();
          },
          (error) => {
            console.error('Error updating booking in DB:', error);
          }
        );
      } else {
        console.error('Booking or user not found.');
      }
    } else {
      console.error('No booking details available to save.');
    }
  }
  

  // getBookings() {
  //   this.cabService.getBookings().subscribe(
  //     (response: Booking[]) => {
  //       this.bookings = response.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  //       console.log('Sorted Bookings:', this.bookings);
  //     },
  //     (error) => {
  //       console.error('Error fetching booking data:', error);
  //     }
  //   );
  // }
  getBookings() {
    this.cabService.getBookings().subscribe(
      (response: Booking[]) => {
        // Log the entire booking data with cab details
        this.bookings = response.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        console.log('Bookings with cab details:', this.bookings);
  
        // Process cab details for each booking
        this.bookings.forEach((booking) => {
          if (booking.cab && booking.cab.length > 0) {
            console.log(`Cabs for Booking ID ${booking.id}:`, booking.cab);
          } else {
            console.log(`No cabs available for Booking ID ${booking.id}`);
          }
        });
      },
      (error) => {
        console.error('Error fetching booking data:', error);
      }
    );
  }
   

   
  getStatusClass(bookingDate: string, status: string): string {
    if (status === 'Cancelled') {
      return 'Cancelled';
    } else if (this.isPastBooking(bookingDate)) {
      return 'Completed';
    } else {
      return 'Upcoming';
    }
  }

  isPastBooking(bookingDate: string): boolean {
    const today = new Date().setHours(0, 0, 0, 0); // Reset time to compare only dates
    const booking = new Date(bookingDate).setHours(0, 0, 0, 0);
    return booking < today;
  }
  
  
  viewDetails(id: number): void {
    this.router.navigate(['/cab-booking', id]);    
  }
   

 
  goBack(): void {
    this.router.navigate(['/']);  
  }
}