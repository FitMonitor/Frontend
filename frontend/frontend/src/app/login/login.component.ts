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

    const url = 'https://identity-server.auth.eu-north-1.amazoncognito.com/login?client_id=4drvtgvmv7kvk465ctcktp6e4f&response_type=code&scope=email+openid&redirect_uri=http://localhost:4200/callback';

    // Redirect to the login page
    window.location.assign(url);
  }
}


/* curl --location --request POST 'https://identity-server.auth.eu-north-1.amazoncognito.com/oauth2/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Authorization: Basic NGRydnRndm12N2t2azQ2NWN0Y2t0cDZlNGY6MTYxNjZldGs3ZHQ2YjVvYjJnYmd1MjNrdGlvdjFjdXR0MHZnZ3NsanVtajBtaWRrbTEyYw==' \
--data-urlencode 'grant_type=authorization_code' \
--data-urlencode 'code=66eb7c55-66aa-43ad-91b8-4d8a0b77eca3' \
--data-urlencode 'redirect_uri=http://localhost:4200/callback'
 */