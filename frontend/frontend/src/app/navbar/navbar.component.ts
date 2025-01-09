import { Component,OnInit} from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Note the plural 'styleUrls'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  roles: string[] = [];
  isUserView: boolean = true;

  constructor(private router:Router) {}

  /*
  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.isLoggedIn = true;
    }
    else{
      this.isLoggedIn = false;
    }
    const roles = localStorage.getItem('roles');
    this.roles = roles ? JSON.parse(roles) : [];
  }*/

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      this.isLoggedIn = !!token;
  
      const roles = localStorage.getItem('roles');
      this.roles = roles ? JSON.parse(roles) : [];
    }
  }
  

  showToggleButton(): boolean {
    return this.isLoggedIn && this.roles.includes('Admin') && this.roles.includes('User');
  }


  toggleView(): void {
    // Toggle the boolean value
    this.isUserView = !this.isUserView;
  
    // Navigate based on the new value of isUserView
    if(this.isLoggedIn){
      if (this.isUserView) {
        this.router.navigate(['/user-dashboard']);
      } else {
        this.router.navigate(['/admin-dashboard']);
      }
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    this.router.navigate(['/']);
    this.isLoggedIn = false;
  }

  // Redirects to login (Cognito or other provider)
  login(): void {
    window.location.href = 'https://eu-north-1awjrvvgms.auth.eu-north-1.amazoncognito.com/login?client_id=517pno0eree438agq70vt50bvo&response_type=code&scope=email+openid+phone&redirect_uri=https://es-ua.ddns.net/callback';
  }

  // Toggle login/logout based on current state
  handleAuthAction(): void {
    if (this.isLoggedIn) {
      this.logout();
    } else {
      this.login();
    }
  }  
}
