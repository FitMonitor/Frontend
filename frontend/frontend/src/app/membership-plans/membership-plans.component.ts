import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';  // For redirection after payment

@Component({
  selector: 'app-membership-plans',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './membership-plans.component.html',
  styleUrls: ['./membership-plans.component.css']
})
export class MembershipPlansComponent {
  plans = [
    {
      price: 10,
      title: 'Basic',
      description: '1 Month access to the gym',
      months: 1,
      features: ['Access to all gym facilities', '1 personal training session', 'Gym support via email']
    },
    {
      price: 25,
      title: 'Advanced',
      description: '3 Months access to the gym',
      months: 3,
      features: ['Access to all gym facilities', '3 personal training sessions', 'Priority booking for group classes']
    },
    {
      price: 45,
      title: 'Pro',
      description: '6 Months access to the gym',
      months: 6,
      features: ['Access to all gym facilities', '6 personal training sessions', 'Free access to premium classes', 'Gym support via phone']
    },
    {
      price: 80,
      title: 'Premium',
      description: '12 Months access to the gym',
      months: 12,
      features: ['Access to all gym facilities', 'Unlimited personal training sessions', 'Free access to all classes', '24/7 Gym Access', 'Priority support']
    }
  ];

  constructor(private apiService:ApiService, private router: Router) {}

  selectPlan(plan: any) {
    console.log(`Plan selected: Price - €${plan.price}, Months - ${plan.months}`);

    this.apiService.createCheckoutSession(plan).subscribe(
      (response: any) => {
        // Assuming the response contains a Stripe checkout session URL
        window.location.href = response.url;  // Redirect to Stripe checkout page
      },
      (error) => {
        console.error('Error creating checkout session', error);
      }
    );
  }
}


