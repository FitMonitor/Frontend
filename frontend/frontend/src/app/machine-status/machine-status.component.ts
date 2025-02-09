import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MachineStatusService } from './machine-status.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../service/api.service';

interface Machine {
  id?: number;
  name: string;
  type: string;
  description?: string;
  available: boolean; 
  userSub: string | null;
  imagePath: string;
  resolvedImagePath?: string;
}

@Component({
  selector: 'app-machine-status',
  standalone: true,
  imports: [CommonModule, NavbarComponent, NavbarComponent],
  templateUrl: './machine-status.component.html',
  styleUrls: ['./machine-status.component.css']
})
export class MachineStatusComponent implements OnInit {
  machines: Machine[] = [];
  message: string | null = null;
  userSub: string | null = null;

  constructor(private machineStatusService: MachineStatusService, private router: Router,private apiService:ApiService) {
    this.message = this.router.getCurrentNavigation()?.extras.state?.['message'];
  }

  async ngOnInit(): Promise<void> {
    if (this.message) {
      setTimeout(() => {
        this.message = null;
      }, 5000);
    }

    try {
      this.userSub = await this.machineStatusService.getUserSub();
      this.machines = await this.machineStatusService.getMachines();

    } catch (error) {
      console.error('Error:', error);
    }

    this.loadMachines();
  }


  async loadMachines(): Promise<void> {
    const data = await this.apiService.getMachines();
    this.machines = data ?? [];
    
    // Load image URLs for all machines asynchronously
    for (const machine of this.machines) {
      machine.resolvedImagePath = await this.apiService.getMachineImage(machine.imagePath);
    }
  }

  async changeMachineState(machineId: number, intention: 'use' | 'leave'): Promise<void> {
    try {
      const isChanged = await this.machineStatusService.changeMachineState(machineId, intention);
  
      if (isChanged) {
        this.machines = await this.machineStatusService.getMachines();
      } else {
        console.error('Failed to change machine state');
      }
    } catch (error) {
      console.error('Error changing machine state:', error);
    }
    this.loadMachines();
  }  

  isMachineUsedByCurrentUser(machine: any): boolean {
    return machine.userSub === this.userSub;
  }
}
