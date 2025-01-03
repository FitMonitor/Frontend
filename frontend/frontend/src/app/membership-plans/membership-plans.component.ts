import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';  
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-membership-plans',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './membership-plans.component.html',
  styleUrls: ['./membership-plans.component.css'],
  providers: [DatePipe] 
})
export class MembershipPlansComponent {
  plans = [
    { price: 10, title: 'Basic', description: '1 Month access to the gym', months: 1, features: ['Feature A'] },
    { price: 25, title: 'Advanced', description: '3 Months access to the gym', months: 3, features: ['Feature B'] },
    { price: 45, title: 'Pro', description: '6 Months access to the gym', months: 6, features: ['Feature C'] },
    { price: 80, title: 'Premium', description: '12 Months access to the gym', months: 12, features: ['Feature D'] }
  ];

  subscriptionStatus: string | null = null;
  subscriptionDate: string | null = null; 
  loading: boolean = true; 

  constructor(private apiService: ApiService, private router: Router, private datePipe: DatePipe) {}

  ngOnInit() {
    this.checkSubscriptionStatus();
  }

  selectPlan(plan: any) {
    this.apiService.createCheckoutSession(plan).subscribe(
      (response: any) => {
        window.location.href = response.url;
      },
      (error) => console.error('Error creating checkout session', error)
    );
  }

  checkSubscriptionStatus(): void {
    this.apiService.getSubscriptionDate().subscribe({
      next: (date: string | null) => {
        this.loading = false;
        if (date) {
          this.subscriptionDate = this.datePipe.transform(date, 'dd-MM-yy') || date; 
          this.subscriptionStatus = 'active';
        } else {
          this.subscriptionStatus = 'inactive';
          this.subscriptionDate = null;
        }
      },
      error: () => {
        this.loading = false;
        this.subscriptionStatus = 'inactive';
        this.subscriptionDate = null;
      },
    });
  }  
}



