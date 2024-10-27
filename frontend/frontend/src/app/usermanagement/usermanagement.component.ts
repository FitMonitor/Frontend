import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { User } from '../model/user.model';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-usermanagement',
  standalone: true,
  imports: [ NgFor],
  templateUrl: './usermanagement.component.html',
  styleUrl: './usermanagement.component.css'
})
export class UsermanagementComponent implements OnInit{

  ApiDataService = inject(ApiService);

  users: User[] = [];

  constructor() { }

  ngOnInit() {
    this.ApiDataService.getAllUsers().then((data: User[]) => {
      this.users = data;
      console.log('Users:', this.users);
    });
  }

  
  

}
