import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment'; // Import environment variables
import { ApiService } from '../service/api.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-callback',
  standalone: true,
  template: '<p>Processing login...</p>',
})
export class CallbackComponent implements OnInit {
  private tokenUrl = environment.tokenUrl;
  private redirectUri = environment.redirectUri;
  private isTokenFetched = false; // Flag to prevent double API call
  private token: string = '';

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
        console.log('Received code:', code);
        this.isTokenFetched = true; // Set flag to true to prevent multiple API calls

        this.apiService.gettoken(code)
          .then(response => {
            console.log('response:', response);
              this.token = response.access_token; // Replace response.token with the correct property
              console.log('Is platform browser:', isPlatformBrowser(this.platformId));
              const localStorage = this.document.defaultView?.localStorage;
              if (localStorage) {
                localStorage.setItem('token', this.token); // Replace response.token with the correct property
                console.log('Token saved in localStorage');
                console.log('Token:', this.token);
              } else {
                console.warn('localStorage is not available. Token cannot be saved.');
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
