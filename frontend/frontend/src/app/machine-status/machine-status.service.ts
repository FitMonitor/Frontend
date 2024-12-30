import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MachineStatusService {
  baseUrl = 'http://localhost:9090/machine';

  async getMachines() {
    const url = `${this.baseUrl}/all`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Error fetching machines:', response.statusText);
      return []; 
    }

    const text = await response.text();
    return text ? JSON.parse(text) : []; 
  }

  async changeMachineState(machineId: number, intention: 'use' | 'leave'): Promise<boolean> {
    const url = `http://localhost:8080/api/qr/machine`;
    const token = localStorage.getItem('token');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        machineId,
        intention
      })
    });
  
    if (!response.ok) {
      console.error('Error changing machine state');
      return false;
    }
  
    const textResponse = await response.text();
    return textResponse.trim().toLowerCase() === 'true';
  }  

  async getUserSub(): Promise<string | null> {
    const token = localStorage.getItem('token');
  
    if (!token) {
      throw new Error('User not authenticated');
    }
  
    const payload = JSON.parse(atob(token.split('.')[1]));
    //console.log('Decoded Token Payload:', payload);
  
    return payload.sub || null; 
  }
  
  
}
