import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MachineStatusService {
  baseUrl = 'https://bnfm9a8mic.execute-api.eu-north-1.amazonaws.com/default';


  async getMachines() {
    const url = `${this.baseUrl}/api/gyms/machine/all`;
    const token = localStorage.getItem('token');

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
    const url = this.baseUrl + `/api/qr/machine`;
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
