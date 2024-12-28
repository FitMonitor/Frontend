import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MachineService } from './machine.service';
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
  available: boolean;  // Include available attribute
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

  constructor(private dialog: MatDialog, private machineService: MachineService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.loadMachines();
  }

  async loadMachines(): Promise<void> {
    const data = await this.machineService.getMachines();
    this.machines = data ?? [];
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

  editMachine(){
    //implement edit machine
  }

  deleteMachine(){
    //implement delete machine
  }

  async showQRCode(machine: Machine): Promise<void> {
    if (!machine.id) {
      console.error('Machine ID is undefined.');
      return;
    }
  
    try {
      const qrCodeBlob = await this.machineService.getMachineQRCode(machine.id.toString());
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

  closeQRCodeModal(): void {
    this.showModal = false;
    this.qrCodeUrl = null;
    this.selectedMachine = null;
  }

}
