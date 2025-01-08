import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.css'
})
export class QrCodeComponent implements OnInit {
  qrCodeImageUrl: string | null = null;
  hasSubscription: boolean | null = null; 
  loading: boolean = true; 

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private apiService: ApiService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document 
  ) {}

  ngOnInit(): void {
    this.generateQRCode(); 
    this.checkSubscription();
  }

  generateQRCode(): void {
    if (!isPlatformBrowser(this.platformId)) {
      console.warn('QR Code generation is not available on the server.');
      return;
    }
  
    const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) {
      const token = localStorage.getItem('token'); 
  
      if (!token) {
        console.error('Token not found in localStorage.');
        return;
      }
  
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
  
      this.http
        .post('https://bnfm9a8mic.execute-api.eu-north-1.amazonaws.com/default/api/qr/generate', { token }, { headers, responseType: 'blob' })
        .subscribe({
          next: (blob) => {
            const reader = new FileReader();
            reader.onload = () => {
              this.qrCodeImageUrl = reader.result as string;
            };
            reader.readAsDataURL(blob);
          },
          error: (err) => {
            console.error('Error generating QR Code:', err);
          },
        });
    } else {
      console.warn('localStorage is not available.');
    }
  }

  checkSubscription(): void {
    this.apiService.getSubscriptionDate().subscribe({
      next: (subscriptionDate) => {
        if (subscriptionDate) {
          this.hasSubscription = true;
          this.generateQRCode(); 
        } else {
          this.hasSubscription = false;
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao verificar subscrição:', err);
        this.hasSubscription = false;
        this.loading = false;
      },
    });
  }

  redirectToPayments(): void {
    this.router.navigate(['/payment']); 
  }
  
}