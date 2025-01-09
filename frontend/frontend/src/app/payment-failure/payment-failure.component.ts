import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-payment-failure',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './payment-failure.component.html',
  styleUrl: './payment-failure.component.css'
})
export class PaymentFailureComponent {
  constructor(private router: Router){}

  redirectToPaymentsPage() {
    this.router.navigate(['/payment']);
  }

}
