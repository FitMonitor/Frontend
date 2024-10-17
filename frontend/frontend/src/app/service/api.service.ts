import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common'
import { environment } from '../../environments/environment'; // Import environment variables


@Injectable({
    providedIn: 'root'
  })
  export class ApiService {
  
    constructor(@Inject(PLATFORM_ID) private platformId: Object, @Inject(DOCUMENT) private document: Document) { }

    async gettoken(code: string) {
        const body = new URLSearchParams();
        body.set('grant_type', 'authorization_code');
        body.set('code', code);
        body.set('redirect_uri', environment.redirectUri);
        const headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': environment.clientSecret
        });
        const response = await fetch(environment.tokenUrl, {
            method: 'POST',
            headers,
            body
        });
        const data = await response.json();
        console.log('Token :', data.access_token);

        /* const localStorage = this.document.defaultView?.localStorage;
              if (localStorage) {
                localStorage.setItem('token', data["id_token"]); // Replace response.token with the correct property
                console.log('Token saved in localStorage');
                console.log('localStorage data:', localStorage.getItem('token'));
                console.log('data___:', data);
              } else {
                console.warn('localStorage is not available. Token cannot be saved.');
              } */
        
        return data

    }

}