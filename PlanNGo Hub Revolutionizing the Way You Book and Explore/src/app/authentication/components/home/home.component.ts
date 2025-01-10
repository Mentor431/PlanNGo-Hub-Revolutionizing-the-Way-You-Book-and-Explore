import { Component, inject, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { User } from '../../interfaces/auth'; // Adjust the path as per your project structure


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGlobe}  from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle}  from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck}  from '@fortawesome/free-solid-svg-icons';
import { faConciergeBell}  from '@fortawesome/free-solid-svg-icons';
import { faAddressBook}  from '@fortawesome/free-solid-svg-icons';
import { faHeart}  from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillAlt}  from '@fortawesome/free-solid-svg-icons';
import { faCog}  from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt}  from '@fortawesome/free-solid-svg-icons';
import { faCompass}  from '@fortawesome/free-solid-svg-icons';
import { faCar}  from '@fortawesome/free-solid-svg-icons';
import { faHotel}  from '@fortawesome/free-solid-svg-icons';
import { faPlane}  from '@fortawesome/free-solid-svg-icons';
import { faMapMarkedAlt}  from '@fortawesome/free-solid-svg-icons';
import {faSuitcase}  from '@fortawesome/free-solid-svg-icons';
import {faLandmark}  from '@fortawesome/free-solid-svg-icons';
import {faUmbrellaBeach}  from '@fortawesome/free-solid-svg-icons';
import {faPlaneDeparture}  from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule,
          FontAwesomeModule,CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  faGlobe = faGlobe;
  faCar=faCar;
  faHotel=faHotel;
  faLandmark = faLandmark;
  faUmbrellaBeach = faUmbrellaBeach;
  faPlaneDeparture = faPlaneDeparture;
  faPlane=faPlane;
  faSuitcase=faSuitcase;
  faMapMarkedAlt=faMapMarkedAlt;
  faHeart = faHeart;
  faMoneyBillAlt = faMoneyBillAlt;
  faCog = faCog;
  faCompass = faCompass;
  faSignOutAlt = faSignOutAlt;
  faCalendarCheck= faCalendarCheck;
  faInfoCircle = faInfoCircle;
  faConciergeBell = faConciergeBell;
  faAddressBook = faAddressBook;


    fullName = '';
    email = '';
    age: number = 0;
    location: string = '';
    gender: string = '';
    isDashboardOpen = false;
    isEditing = false; // New flag for edit mode
    userId = ''; // Hardcoded for mock backend. Replace with dynamic ID logic.
    profileData: User | null = null;

    constructor() {
      const storedUserId = sessionStorage.getItem('userId');
      if (storedUserId) {
        this.userId = storedUserId; // Use the stored userId
        this.loadProfile(); // Load profile data dynamically
      } else {
        console.error('No user ID found in session');
        this.router.navigate(['login']); // Redirect to login if no user ID
      }    
    }
  
  
    toggleDashboard() {
      this.isDashboardOpen = !this.isDashboardOpen;
    }
    loadProfile() {
      this.authService.getUserProfile(this.userId).subscribe({
        next: (data: User) => {
          console.log('Profile Data:', data); // Debugging
          this.profileData = data || { id: '', fullName: '', email: '' }; // Fallback
          this.fullName = data.fullName;
          this.email = data.email;
          this.age = data.age;
          this.location = data.location;
          this.gender = data.gender;
        },
        error: () => {
          console.error('Failed to load profile');
        },
      });
    }
  
    editProfile() {
      this.isEditing = true;
     
    }
  
    saveProfile() {
      if (this.profileData) {
        this.authService
          .updateUserProfile(this.userId, this.profileData)
          .subscribe({
            next: (updatedData: User) => {
              this.profileData = updatedData;
              this.fullName = updatedData.fullName;
               this.email = updatedData.email;
              this.age = updatedData.age;
              this.location = updatedData.location;
              this.gender = updatedData.gender;
              this.isEditing = false;
            },
            error: () => {
              console.error('Failed to update profile');
            },
          });
      }
    }
  
    cancelEdit() {
      this.isEditing = false;
      this.loadProfile(); // Reload data to discard unsaved changes
    }
  
    logout() {
      sessionStorage.clear();
      this.router.navigate(['login']);
    }
  }
  
  




