import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MachineService } from './machine.service';

interface Machine {
  id?: number;
  name: string;
  type: string;
  description?: string;
  available: boolean;  // Include available attribute
}

@Component({
  selector: 'app-add-machine',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './addmachine.component.html',
  styleUrls: ['./addmachine.component.css']
})
export class AddMachineComponent implements OnInit {
  machineForm!: FormGroup;
  machines: Machine[] = [];
  showModal: boolean = false;

  machineService = inject(MachineService);
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.machineForm = this.fb.group({
      name: ['', [Validators.required]],
      available: [true, Validators.required],
      description: ['', [Validators.required]],
    });

    this.loadMachines(); // Load existing machines from the API
  }

  async loadMachines(): Promise<void> {
    const data = await this.machineService.getMachines();
    this.machines = data ?? [];
  }

  toggleModal(): void {
    this.showModal = !this.showModal;
  }

  async deleteMachine():Promise<void> {
    //implement later
  }

  async editMachine():Promise<void> {
    //implement later
  }


  async onSubmit(): Promise<void> {
    if (this.machineForm.valid) {
      const newMachine: Machine = this.machineForm.value;
      const response = await this.machineService.createMachine(newMachine);
      if (response) {
        this.machines.push(response);
        this.showModal = false;
        this.machineForm.reset();
        this.machineForm.patchValue({ available: true }); // Reset available to true
      } else {
        console.error('Error creating machine:', response);
      }
    }
  }
}
