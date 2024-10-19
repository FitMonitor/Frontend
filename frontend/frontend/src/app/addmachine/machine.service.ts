import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' }) // This line makes it available globally
export class MachineService {
  baseUrl = 'http://localhost:8080/machine';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async getMachines() {
    const url = `${this.baseUrl}/all`;
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
    const url = `${this.baseUrl}`;
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


