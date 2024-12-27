//hotel-results.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.model';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hotel-results.component.html',
  styleUrls: ['./hotel-results.component.css'],
})
export class HotelResultsComponent implements OnInit {
  hotels: Hotel[] = [];
  filteredHotels: Hotel[] = [];
  searchParams: any;

  filters = {
    price: 0,
    minPrice: 0,
    amenities: [] as string[],
  };

  availableAmenities = [
    'Free WiFi',
    'Air Conditioning',
    'Parking',
    'Sea View',
    'Spa',
    'Fitness Center',
    'Restaurant',
    'Bar',
    'Garden View',
    'Pool',
    'Mountain View',
    'Yoga Retreat',
    'City View',
    'Beachfront',
    'Palace View',
    'Gym',
    'Lake View',
  ];

  constructor(private route: ActivatedRoute, private hotelService: HotelService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchParams = params;
      this.fetchHotels(params['location']);
    });
  }

  fetchHotels(location?: string) {
    console.log("Location passed: ", location);
    if (!location?.trim()) {
      this.hotels = [];
      this.filteredHotels = [];
      return; // No location provided, don't fetch hotels
    }
    this.hotelService.getHotelsByLocation(location).subscribe(
      (data) => {
        this.hotels = data;
        this.filteredHotels = [...this.hotels]; // Keep the original list for filtering
      },
      (error) => {
        console.error('Error fetching hotel data:', error);
        this.hotels = [];
        this.filteredHotels = [];
      }
    );
  }
  
  
  applyFilters() {
    // Apply both price and amenities filtering
    this.filteredHotels = this.hotelService.filterHotels(this.hotels, this.filters);
  }
  
  onAmenityChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const amenity = checkbox.value;
  
    if (checkbox.checked) {
      this.filters.amenities.push(amenity);
    } else {
      this.filters.amenities = this.filters.amenities.filter((a) => a !== amenity);
    }
    // Do not call applyFilters() here to avoid auto-filtering
  }
}  