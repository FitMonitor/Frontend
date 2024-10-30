import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { User } from '../model/user.model';
import { NgClass, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';


@Component({
  selector: 'app-usermanagement',
  standalone: true,
  imports: [ NgFor, NgClass, FormsModule],
  templateUrl: './usermanagement.component.html',
  styleUrl: './usermanagement.component.css'
})
export class UsermanagementComponent implements OnInit{

  ApiDataService = inject(ApiService);

  users: User[] = [];
  searchQuery = '';  // Property to hold search input

  constructor() { }

  ngOnInit() {
    this.ApiDataService.getAllUsers().then((data: User[]) => {
      this.users = data;
      console.log('Users:', this.users);
    });
  }

  changeUserRole(userId: string, group: string, action: string) {
    this.ApiDataService.changeUserRole(userId, group, action).then(() => {
      this.ApiDataService.getAllUsers().then((data: User[]) => {
        this.users = data;
      });
    });

  }

  async toggleUserRole(userId: string, groupName: string) {
    const user = this.users.find(u => u.sub === userId);
    const hasRole = user?.groups?.includes(groupName);
    const action = hasRole ? 'remove' : 'add';
    
    await this.changeUserRole(userId, groupName, action);
    if (user) {
      if (hasRole) {
        user.groups = user.groups?.filter(group => group !== groupName);
      } else {
        user.groups = [...(user.groups || []), groupName];
      }
    }
  }

  // Method to filter users based on search query
  filteredUsers(): User[] {
    return this.users.filter(user =>
      user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  
}
