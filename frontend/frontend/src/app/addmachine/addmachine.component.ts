import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';
import {MatDialog} from "@angular/material/dialog";
import {AddmachinemodalComponent} from "../addmachinemodal/addmachinemodal.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatAnchor, MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import { NavbarComponent } from '../navbar/navbar.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface Machine {
  id?: number;
  name: string;
  type: string;
  description?: string;
  available: boolean; 
  imagePath: string;
  resolvedImagePath?: string;
}

@Component({
  selector: 'app-add-machine',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatToolbar, MatButton, RouterLink, MatAnchor,NavbarComponent,AdminNavbarComponent],
  templateUrl: './addmachine.component.html',
  styleUrls: ['./addmachine.component.css']
})
export class AddMachineComponent implements OnInit {
  machineForm!: FormGroup;
  machines: Machine[] = [];
  showModal: boolean = false;
  qrCodeUrl: SafeUrl | null = null; 
  selectedMachine: Machine | null = null; 

  fb = inject(FormBuilder);

  constructor(private dialog: MatDialog, private apiService:ApiService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadMachines();
  }

  async loadMachines(): Promise<void> {
    const data = await this.apiService.getMachines();
    this.machines = data ?? [];
    
    // Load image URLs for all machines asynchronously
    for (const machine of this.machines) {
      machine.resolvedImagePath = await this.getMachineImage(machine.imagePath);
    }
  }

  openModal() {
    const dialogRef = this.dialog.open(AddmachinemodalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMachines();
      }
    });
  }

  async showQRCode(machine: Machine): Promise<void> {
    if (!machine.id) {
      console.error('Machine ID is undefined.');
      return;
    }
  
    try {
      const qrCodeBlob = await this.apiService.getMachineQRCode(machine.id.toString());
      if (qrCodeBlob) {
        const qrCodeObjectURL = URL.createObjectURL(qrCodeBlob);
        this.qrCodeUrl = this.sanitizer.bypassSecurityTrustUrl(qrCodeObjectURL);
        this.selectedMachine = machine;
        this.showModal = true; 
      }
    } catch (error) {
      console.error('Failed to fetch QR Code:', error);
    }
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
        
        console.log('Cleaned Image Path:', cleanedImagePath);
        console.log('Encoded Image Path:', encodedImagePath);
        console.log('Final URL:', url);
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
            console.warn(`Image not found or unauthorized: ${response.status}`);
            return defaultImage;
        }

        return url;
    } catch (error) {
        console.error('Error fetching image:', error);
        return defaultImage;
    }
  }

  closeQRCodeModal(): void {
    this.showModal = false;
    this.qrCodeUrl = null;
    this.selectedMachine = null;
  }
}
