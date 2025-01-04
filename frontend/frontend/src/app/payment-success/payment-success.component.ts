import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.css'
})
export class PaymentSuccessComponent {
  constructor(private router: Router){}

  redirectToPaymentsPage() {
    this.router.navigate(['/payment']);
  }

}
