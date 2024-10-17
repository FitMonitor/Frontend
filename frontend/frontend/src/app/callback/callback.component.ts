import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment'; // Import environment variables
import { ApiService } from '../service/api.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [],
  template: '<p>Processing login...</p>',
})
export class CallbackComponent implements OnInit {
  private tokenUrl = environment.tokenUrl;
  private redirectUri = environment.redirectUri;
  ApiService = inject(ApiService);

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    const localStorage = document.defaultView?.localStorage;
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const code = params['code']; 
      if (code) {
        console.log('Received code:', code);
        this.ApiService.gettoken(code)
          .then(response => {
              //console.log('Token response:', response);
              console.log('Is platform browser:', isPlatformBrowser(this.platformId));
              console.log('response:', response);
  
              // Use the localStorage defined in the constructor
              const localStorage = this.document.defaultView?.localStorage;
              if (localStorage) {
                //localStorage.setItem('token', response.token); // Replace response.token with the correct property
                console.log('Token saved in localStorage');
              } else {
                console.warn('localStorage is not available. Token cannot be saved.');
              }
          })
          .catch(error => {
              console.error('Error during token retrieval:', error);
          });
      } else {
        console.error('No code found in redirect');
        this.router.navigate(['/']);
      }
    });
  }

}
  

  /* getToken(code: string) {
    const body = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', code)
      .set('redirect_uri', this.redirectUri);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': environment.clientSecret
    });

    this.http.post(this.tokenUrl, body.toString(), { headers })
      .subscribe(
        (response: any) => {
          console.log('Token response:', response);

          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('access_token', response.access_token); 
          } else {
            console.warn('localStorage is not available. Token cannot be saved.');
          }

          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error fetching token:', error);
          this.router.navigate(['/']);
        }
      );
  } */

