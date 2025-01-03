import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../service/api.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-callback',
  standalone: true,
  template: '<p>Processing login...</p>',
})
export class CallbackComponent implements OnInit {
  private isTokenFetched = false; // Flag to prevent double API call
  private token: string = '';
  private roles: string[] = [];

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code']; 
      if (code && !this.isTokenFetched) { // Check the flag to prevent multiple calls
        this.isTokenFetched = true; // Set flag to true to prevent multiple API calls

        this.apiService.gettoken(code)
          .then(response => {

            this.roles = response.roles;
            // Parse the token string into a JSON object
            const tokenObject = JSON.parse(response.token);

            this.token = tokenObject.id_token; // Use the parsed token object
            
            const localStorage = this.document.defaultView?.localStorage;
            if (localStorage) {
              localStorage.setItem('token', this.token); // Save the id_token
              localStorage.setItem('roles', JSON.stringify(this.roles)); // Save the roles
            } else {
              console.warn('localStorage is not available. Token cannot be saved.');
            }


            if (this.roles.includes('Admin')) {
              this.router.navigate(['/admin-dashboard']);
            } else if (this.roles.includes('User')) {
              this.router.navigate(['/user-dashboard']);
            } else {
              console.error('No role found in the token');
              this.router.navigate(['/']);
            }
            
          })
          .catch(error => {
            console.error('Error during token retrieval:', error);
          });


      } else if (!code) {
        console.error('No code found in redirect');
        this.router.navigate(['/']);
      }
    });
    
  }
}
