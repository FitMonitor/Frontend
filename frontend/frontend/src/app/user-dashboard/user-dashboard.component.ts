import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../service/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule,NavbarComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit {
  gymId: number = 2;
  gymOccupancy: any;
  message: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {
    this.message = this.router.getCurrentNavigation()?.extras.state?.['message'];
  }

  ngOnInit(): void {
    if (this.message) {
      // Automatically clear the message after 2 seconds
      setTimeout(() => {
        this.message = null;
      }, 5000);
    }
  
    this.fetchGymOccupancy();
  }
  

  async fetchGymOccupancy() {
    try {
      this.gymOccupancy = await this.apiService.getGymOccupancy();
      console.log('Gym occupancy:', this.gymOccupancy);
    } catch (error) {
      console.error('Error fetching gym occupancy:', error);
    }
  }

  calculateOccupancyPercentage(): number {
    return (this.gymOccupancy / 100) * 100;
}

calculateColor(): string {
    const percentage = this.calculateOccupancyPercentage();
    if (percentage < 50) return '#00FF00'; // Green for low occupancy
    if (percentage < 80) return '#FFFF00'; // Yellow for medium occupancy
    return '#FF0000'; // Red for high occupancy
}
}
