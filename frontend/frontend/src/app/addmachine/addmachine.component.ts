import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {MatDialog} from "@angular/material/dialog";
import {AddmachinemodalComponent} from "../addmachinemodal/addmachinemodal.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatAnchor, MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import { ApiService } from '../service/api.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';

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

  fb = inject(FormBuilder);

  constructor(private dialog: MatDialog, private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadMachines();
  }

  async loadMachines(): Promise<void> {
    const data = await this.apiService.getMachines();
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

}
