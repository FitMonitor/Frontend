import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment'; // Import environment variables

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, @Inject(DOCUMENT) private document: Document) { }

  async gettoken(code: string) {
    // Construct the GET request URL with the code parameter
    const url = `http://localhost:8080/api/token/get?code=${code}`;

    const headers = new Headers({
      'Content-Type': 'application/json', // The server expects a GET request, so content type is not necessary, but you can adjust this.
    });

    // Make the GET request
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    const data = await response.json();
    console.log('Token:', data.access_token);
    
    return data;
  }
}
