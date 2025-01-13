import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts'; // Corrected import
import { ChartConfiguration } from 'chart.js'; // Corrected import
import { User } from '../../models/auth'; // Adjust the path as per your project structure

import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [CommonModule, NgChartsModule], // Corrected module import
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  totalUsers = 0;

  // Chart Data
  genderDistribution!: ChartConfiguration<'pie'>['data'];
  ageDistribution!: ChartConfiguration<'bar'>['data'];
  locationDistribution!: ChartConfiguration<'line'>['data'];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http.get<User[]>('http://localhost:3000/users').subscribe((data) => {
      console.log('Fetched data:', data);

      // Filter only users (excluding admins)
      const filteredUsers = data.filter((user) => {
        console.log('User role:', user.role); // Log user roles to ensure it's filtering correctly
        return user.role === 'User'; // Only include users
      });

      // Log the filtered users to check if the filtering worked
      console.log('Filtered users:', filteredUsers);

      // Set the users array to only contain the filtered users
      this.users = filteredUsers;

      // Set the totalUsers count based on the filtered users
      this.totalUsers = this.users.length;

      // Generate charts with filtered user data
      this.generateCharts();
    });
  }

  generateCharts(): void {
    this.generateGenderChart();
    this.generateAgeChart();
    this.generateLocationChart();
  }

  generateGenderChart(): void {
    const genderCounts: { [key: string]: number } = { Male: 0, Female: 0, Other: 0 };

    this.users.forEach((user) => {
      genderCounts[user.gender] = (genderCounts[user.gender] || 0) + 1;
    });

    this.genderDistribution = {
      labels: Object.keys(genderCounts),
      datasets: [
        {
          data: Object.values(genderCounts),
          backgroundColor: ['#42A5F5', '#FF6384', '#FFCE56'],
        },
      ],
    };
  }

  generateAgeChart(): void {
    const ageGroups: { [key: string]: number } = { '0-18': 0, '19-35': 0, '36-50': 0, '51+': 0 };

    this.users.forEach((user) => {
      if (user.age <= 18) ageGroups['0-18']++;
      else if (user.age <= 35) ageGroups['19-35']++;
      else if (user.age <= 50) ageGroups['36-50']++;
      else ageGroups['51+']++;
    });

    this.ageDistribution = {
      labels: Object.keys(ageGroups),
      datasets: [
        {
          label: 'Users by Age Group',
          data: Object.values(ageGroups),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A'],

        },
      ],
    };
  }

  generateLocationChart(): void {
    const locationCounts: { [key: string]: number } = {};

    this.users.forEach((user) => {
      locationCounts[user.location] = (locationCounts[user.location] || 0) + 1;
    });

    this.locationDistribution = {
      labels: Object.keys(locationCounts),
      datasets: [
        {
          label: 'Users by Location',
          data: Object.values(locationCounts),
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          fill: false,
        },
      ],
    };
  }
}
