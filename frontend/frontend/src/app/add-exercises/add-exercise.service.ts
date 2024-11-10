import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddExerciseService {

  private apiUrl = 'http://13.51.167.237:8080/api/exercises';  
  private apiUrlMachines = 'http://13.51.167.237:8080/machine'

  constructor() {}

  async getMachines() {
    const url = `${this.apiUrlMachines}/all`;
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

  async getCategories(): Promise<string[]> {
    const url = `${this.apiUrl}/categories`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', 
      },
    });

    if (!response.ok) {
      console.error('Error fetching categories:', response.statusText);
      return []; 
    }

    const text = await response.text(); 
    console.log(JSON.parse(text));
    return text ? JSON.parse(text) : [];  
  }

  async getMuscleGroups(): Promise<string[]> {
    const url = `${this.apiUrl}/musclesGroups`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Error fetching groups:', response.statusText);
      return []; 
    }

    const text = await response.text();  
    return text ? JSON.parse(text) : [];
  }

  async createExercise(exerciseData: any): Promise<any> {
    const url = `${this.apiUrl}/create`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(exerciseData), 
    });

    if (!response.ok) {
      console.error('Error creating a new exercise:', response.statusText);
      return null; 
    }

    const text = await response.text();  
    return text ? JSON.parse(text) : null; 
  }

  async getExercises() {
    const url = `${this.apiUrl}/all`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error('Error fetching Exercises:', response.statusText);
      return [];
    }

    const text = await response.text();
    console.log(JSON.parse(text));
    return text ? JSON.parse(text) : [];
  }
}
