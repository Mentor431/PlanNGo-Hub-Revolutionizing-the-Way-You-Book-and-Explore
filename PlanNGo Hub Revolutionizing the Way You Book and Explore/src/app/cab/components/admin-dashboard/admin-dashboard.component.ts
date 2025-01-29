import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
//import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports:[FormsModule, CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  totalCabs = 0;
  totalRides = 0;
  totalBookings = 0;
  isFabMenuOpen: boolean = false;  

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    // this.http.get<any>('http://localhost:3000/cabs').subscribe((data) => {

    
    //   // Calculate totals
    //   console.log(data, 'devi');
    //   this.totalCabs = data.length;
    //   this.totalBookings = data.bookings.length;
    //   this.totalRides = data.bookings.filter((b: any) => b.status !== 'Cancelled').length;

    //   // Render charts

    //   this.renderCityPieChart(data.cabs);
    //   this.renderGenderPieChart(data.bookings);
    //   this.renderCarBarChart(data.cabs);
    // });
    try { // Using async/await for each API call
      const cabs = await firstValueFrom(this.http.get<any>('http://localhost:3000/cabs'));
      const bookings = await firstValueFrom(this.http.get<any>('http://localhost:3000/bookings'));
      this.totalCabs = cabs.length;
      this.totalBookings = bookings.length;
      this.totalRides = bookings.filter((b: any) => b.status !== 'Cancelled').length;
      console.log('Cabs:', cabs);
      this.renderCityPieChart(cabs);
      this.renderGenderPieChart(bookings);
      this.renderCarBarChart(cabs);
      // console.log('FAQs:', faqs);
      console.log('Bookings:', bookings);
    }
    catch (error) 
    { 
      console.error('Error fetching data:', error); 
    }

  }

  renderCityPieChart(cabs: any[]) {
    const cityCounts = cabs.reduce((acc: any, cab: any) => {
      acc[cab.location] = (acc[cab.location] || 0) + 1;
      return acc;
    }, {});

    const cities = Object.keys(cityCounts).slice(0, 4);
    const counts = Object.values(cityCounts).slice(0, 4);

    new Chart('cityPieChart', {
      type: 'pie',
      data: {
        labels: cities,
        datasets: [
          {
            data: counts,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          },
        ],
      },
    });
  }

  toggleFabMenu(): void {
    this.isFabMenuOpen = !this.isFabMenuOpen;
  }

  renderGenderPieChart(bookings: any[]) {
    const genderCounts = bookings.reduce(
      (acc: any, booking: any) => {
        const gender = booking.users[0]?.gender.toLowerCase();
        if (gender === 'male') acc.male++;
        else if (gender === 'female') acc.female++;
        return acc;
      },
      { male: 0, female: 0 }
    );

    new Chart('genderPieChart', {
      type: 'pie',
      data: {
        labels: ['Male', 'Female'],
        datasets: [
          {
            data: [genderCounts.male, genderCounts.female],
            backgroundColor: ['blue', 'pink'],
          },
        ],
      },
    });
  }

  renderCarBarChart(cabs: any[]) {
    const carTypeCounts = cabs.reduce((acc: any, cab: any) => {
      acc[cab.type] = (acc[cab.type] || 0) + 1;
      return acc;
    }, {});

    const carTypes = Object.keys(carTypeCounts);
    const counts = Object.values(carTypeCounts);

    
    
    new Chart('carBarChart', {
      type: 'bar',
      data: {
        labels: carTypes,
        datasets: [
          {
            label: 'Bookings',
            data: counts,
            backgroundColor: 'orange',
            barPercentage: 0.7, // Keep bars wide
            categoryPercentage: 0.75, // Increase spacing between bars
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 25,
              },
            },
            min: 0, // Set minimum value for x-axis
            max: carTypes.length - 1, // Ensure it stretches to fit all bars
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      },
    });
    
  }
}