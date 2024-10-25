import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUser, signIn, AuthSession } from '@aws-amplify/auth';

@Component({
  selector: 'app-callback',
  template: '<p>Processing login...</p>',
})
export class CallbackComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code']; // Get the authorization code from the query params
      if (code) {
        console.log('Received code:', code);
        this.router.navigate(['/user-dashboard']);
        
      } else {
        // Handle error or redirect if code is missing
        console.error('No code found in redirect');
        this.router.navigate(['/']);
      }
    });
  }

  
    
}
