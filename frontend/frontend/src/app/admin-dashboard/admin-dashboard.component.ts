import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NavbarComponent, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
