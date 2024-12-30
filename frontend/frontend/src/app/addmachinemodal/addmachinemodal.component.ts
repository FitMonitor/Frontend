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
import {ApiService} from "../service/api.service";

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
  selectedFile: File | null = null;

  constructor( private fb: FormBuilder, private apiService:ApiService,private dialogRef: MatDialogRef<AddmachinemodalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.machineForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      available: [true]
    });
  }

  async save(): Promise<void> {
    if (this.machineForm.invalid) {
      console.error('Form is invalid');
      return;
    }
  
    const machineData = this.machineForm.value;
    const formData = new FormData();
  
    // Append form fields
    formData.append('name', machineData.name);
    formData.append('description', machineData.description);
    formData.append('available', String(machineData.available));

    // Append the file if it exists
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    } else {
      console.warn('No image file selected');
    }
  
    // Debugging the FormData contents
    console.log('FormData contents:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
  
    try {
      const newMachine = await this.apiService.createMachine(formData);
      this.dialogRef.close(newMachine); // Close dialog and return the new machine
    } catch (error) {
      console.error('Error saving machine:', error);
    }
  }
  


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onCancel(){
    this.dialogRef.close();
  }

}
