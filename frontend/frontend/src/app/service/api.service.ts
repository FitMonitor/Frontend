import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, @Inject(DOCUMENT) private document: Document) { }

  isPlatformBrowser() {
    return isPlatformBrowser(this.platformId);
  }

  private getAuthToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }

  private getHeaders1(withAuth: boolean = false):Headers{
    const headers = new Headers({
    });
    if (withAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers.append('Authorization', `Bearer ${token}`);
        headers.append('Content-Type', 'application/json')
      }
    }
    return headers;

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
    const url = `http://localhost:8080/api/token/get?code=${code}`;

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
    const url = `http://localhost:9090/api/gyms/occupancy?id=1`;

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
    const url = `http://localhost:9090/machine/all`;
    const headers = this.getHeaders(true);

    const response = await fetch(url, {
      method: 'GET',
      headers,
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
    const headers = this.getHeaders1(true);

    const url = `http://localhost:9090/machine`;
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(machine)
    });
    return await response.json() ?? undefined;
  }

  async sendMachineStatus(data: any) {
    console.log('Data to send:', data);
  
    const headers = this.getHeaders1(true);
  
    const url = 'http://localhost:8080/api/qr/machine';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }
  
      const contentType = response.headers.get('Content-Type');
      let result;
  
      if (contentType && contentType.includes('application/json')) {
        result = await response.json(); // Parse JSON response
      } else {
        result = await response.text(); // Handle plain text response
      }
  
      console.log('Response from server:', result);
      return result;
    } catch (error) {
      console.error('Error sending machine status:', error);
      throw error;
    }
  }

  async manageGymEntrance(data:any){
  
    const headers = this.getHeaders1(true);
  
    const url = 'http://localhost:8080/api/qr/gym_entrance';
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
      }
  
      const contentType = response.headers.get('Content-Type');
      let result;
  
      if (contentType && contentType.includes('application/json')) {
        result = await response.json(); // Parse JSON response
      } else {
        result = await response.text(); // Handle plain text response
      }
  
      console.log('Response from server:', result);
      return result;
    } catch (error) {
      console.error('Error sending gym status:', error);
      throw error;
    }
  }

  async getMachineQRCode(machineId: string): Promise<Blob | null> {
    const url = `http://localhost:8080/api/qrcode/generate-machine`;
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ machineId }),
    });
  
    if (!response.ok) {
      console.error('Error fetching QR code:', response.statusText);
      return null;
    }
  
    return await response.blob(); 
  }
  
}
