import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, @Inject(DOCUMENT) private document: Document, private http: HttpClient) { }

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

  private getHeaders2(withAuth: boolean = false):Headers{
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
    //console.log('Token:', data.id_token);

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

  async createMachine(formData: FormData) {
    //console.log('Creating machine:', formData);
    const headers = this.getHeaders2(true);

    const url = `http://localhost:9090/machine`;
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData
    });
    //console.log(response)
    return await response.json() ?? undefined;
  }

  async sendMachineStatus(data: any) {
    //console.log('Data to send:', data);
  
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
  
      //console.log('Response from server:', result);
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
  
      //console.log('Response from server:', result);
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

  async getMachineImage(imagePath: string): Promise<string> {
    const baseUrl = 'http://localhost:9090/machine/image?imagePath=';
    const defaultImage = 'https://media.istockphoto.com/id/854012462/photo/barbell-ready-for-workout-indoors-selective-focus.jpg?s=612x612&w=0&k=20&c=lSHMTs2Rm9XPJqGVxlMjs9pr-RMWwB7lbf8E-RIARhM=';
    const token = localStorage.getItem('token');
  
    if (!imagePath) {
      return defaultImage;
    }
  
    try {
      const cleanedImagePath = imagePath.replace(/^uploads\//, '');
      const encodedImagePath = encodeURIComponent(cleanedImagePath);
      const url = `${baseUrl}${encodedImagePath}`;
  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        console.warn(`Image not found or unauthorized: ${response.status}`);
        return defaultImage;
      }
  
      const blob = await response.blob(); // Convert response to a Blob
      return URL.createObjectURL(blob); // Create a Blob URL
    } catch (error) {
      console.error('Error fetching image:', error);
      return defaultImage;
    }
  }

  createCheckoutSession(plan: any): Observable<any> {
    const apiUrl= 'http://localhost:8181/api/payment/create-checkout-session';
    const payload = {
      amount: plan.price * 100, // Amount in cents
      currency: 'eur', // You can customize this
      successUrl: window.location.origin + '/payment-success',
      cancelUrl: window.location.origin + '/payment-cancel'
    };

    //console.log(JSON.stringify(payload))

    const headers = this.getHeaders1(true);
  
    return new Observable((observer) => {
      fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  
  getSubscriptionDate(): Observable<string | null> {
    const headers = this.getHeaders1(true);
    return new Observable((observer) => {
      fetch('http://localhost:8181/api/payment/user/subscriptiondate', {
        method: 'GET',
        headers,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then((data) => {
          observer.next(data); 
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
  
}
