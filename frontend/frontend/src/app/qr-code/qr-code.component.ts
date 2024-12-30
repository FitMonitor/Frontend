import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.css'
})
export class QrCodeComponent implements OnInit {
  qrCodeImageUrl: string | null = null;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document 
  ) {}

  ngOnInit(): void {
    this.generateQRCode(); 
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
        .post('http://localhost:8080/api/qrcode/generate', { token }, { headers, responseType: 'blob' })
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
  
}