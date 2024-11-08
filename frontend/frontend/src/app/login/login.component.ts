import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Note: Use 'styleUrls' instead of 'styleUrl'
})
export class LoginComponent {
  constructor(private router: Router) {}

  onButtonClick() {
    console.log('Button clicked! Redirecting to login...');

    const url = 'https://identity-server.auth.eu-north-1.amazoncognito.com/login?client_id=4drvtgvmv7kvk465ctcktp6e4f&response_type=code&scope=email+openid&redirect_uri=http://16.170.216.31:4200/callback';

    // Redirect to the login page
    window.location.assign(url);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  goToAboutUs() {
    // Navigate to About Us page (assuming you have an About Us route)
    this.router.navigate(['/about']);
  }
}
