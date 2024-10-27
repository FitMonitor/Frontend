import { Component,Inject } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
} from '@angular/material/dialog';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatButton} from "@angular/material/button";
import {MachineService} from "../addmachine/machine.service";

@Component({
  selector: 'app-addmachinemodal',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatRadioGroup,
    MatRadioButton,
    MatDialogActions,
    MatButton,
    MatLabel
  ],
  templateUrl: './addmachinemodal.component.html',
  styleUrl: './addmachinemodal.component.css'
})
export class AddmachinemodalComponent {
  machineForm!: FormGroup;

  constructor( private fb: FormBuilder, private machineService:MachineService,private dialogRef: MatDialogRef<AddmachinemodalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.machineForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      available: [true]
    });
  }

  async save(): Promise<void> {
    console.log(this.machineForm)
    if (this.machineForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const machineData = this.machineForm.value;
    console.log('Machine data:', machineData);

    try {
      console.log(this.machineService.isPlatformBrowser())
      if (this.machineService.isPlatformBrowser()) {
        const newMachine = await this.machineService.createMachine(machineData);
        console.log('New task:', newMachine);
        this.dialogRef.close(newMachine);  // Return new task to the caller
      }
    } catch (error) {
      console.error('Error saving task:', error);
    }
  }

  onCancel(){
    this.dialogRef.close();
  }

}
