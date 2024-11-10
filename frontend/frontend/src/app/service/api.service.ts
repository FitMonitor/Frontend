import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://13.48.204.151:8080';


  constructor(@Inject(PLATFORM_ID) private platformId: Object, @Inject(DOCUMENT) private document: Document) { }

  private getAuthToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }

  private getHeaders(withAuth: boolean = false): Headers {
    const headers = new Headers({
    });
    if (withAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers.append('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  }

  async gettoken(code: string) {
    // Construct the GET request URL with the code parameter
    const url = `${this.baseUrl}/api/token/get?code=${code}`;

    const headers = new Headers({
      'Content-Type': 'text/plain',
    });

    // Make the GET request
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    const data = await response.json();
    console.log('Token:', data.id_token);

    return data;
  }

  async getAllUsers() {
    const url = `https://eyc1h7rd28.execute-api.eu-north-1.amazonaws.com/qa/getAllUsers`;

    const headers = this.getHeaders(true);

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    return await response.json() ?? [];
  }

  async changeUserRole(userId: string, groupName: string, action: string) {
    const url = `https://kfgnjxm7l2.execute-api.eu-north-1.amazonaws.com/default/addusertogroup`;

    const headers = this.getHeaders(true);

    const body = {
      userId,
      groupName,
      action,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
  }
  
  async getGymOccupancy() {
    const url = `${this.baseUrl}/api/gyms/occupancy?id=1`;

    const headers = this.getHeaders(true);

    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    if (!response.ok) {
      throw new Error('Failed to fetch gym occupancy');
    }

    return await response.json();
  }

  async getMachines() {
    const url = `${this.baseUrl}/machine/all`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // Handle error response
      console.error('Error fetching machines:', response.statusText);
      return []; // Return an empty array or handle as needed
    }

    // Check if response body is empty
    const text = await response.text();
    return text ? JSON.parse(text) : []; // Safely parse JSON
  }

  async createMachine(machine: any) {
    console.log('Creating machine:', machine);
    const url = `${this.baseUrl}/machine`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(machine)
    });
    return await response.json() ?? undefined;
  }
}
