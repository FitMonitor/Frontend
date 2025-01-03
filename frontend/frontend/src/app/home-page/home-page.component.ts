import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  constructor() { }

  //remove token and role from local storage on init
  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
  }



}
