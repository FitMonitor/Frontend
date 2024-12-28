import { Component, OnInit, OnDestroy } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { ApiService } from "../service/api.service";

@Component({
  selector: 'app-qr-code-scanner-entrance',
  standalone: true,
  imports: [NgIf, AdminNavbarComponent],
  templateUrl: './qr-code-scanner-entrance.component.html',
  styleUrls: ['./qr-code-scanner-entrance.component.css']
})
export class QrCodeScannerEntranceComponent implements OnInit, OnDestroy {
  private scanner: BrowserMultiFormatReader;
  scanResult: string | null = null;
  message: string | null = null; // Variable to store the message
  private scannerControls: any | null = null;
  private isProcessing: boolean = false;

  constructor(private apiService: ApiService, private router: Router) {
    this.scanner = new BrowserMultiFormatReader();
  }

  ngOnInit(): void {}

  startScan(): void {
    const videoElement = document.querySelector('video') as HTMLVideoElement;

    this.scanner.decodeFromVideoDevice(undefined, videoElement, (result, error, controls) => {
      if (controls) {
        this.scannerControls = controls;
      }

      if (result && !this.isProcessing) {
        this.isProcessing = true;
        this.scanResult = result.getText();

        const testData = {
          token: "1234567890",};

        this.apiService.manageGymEntrance(testData)
          .then((response) => {
            if (response === "Entered") {
              this.showMessage("You have successfully entered the gym.");
            } else if (response === "Left") {
              this.showMessage("You have successfully left the gym.");
            } else if (response === "Full") {
              this.showMessage("The gym is full. Please try again later.");
            }
          })
          .catch((error) => {
            console.error('Error occurred:', error);
            this.showMessage("An error occurred. Please try again.");
          })
          .finally(() => {
            setTimeout(() => {
              this.isProcessing = false;
            }, 5000);
          });
      }

      if (error && error.name !== 'NotFoundException2') {
        console.error(error);
      }
    });
  }

  stopScan(): void {
    if (this.scannerControls) {
      this.scannerControls.stop();
      this.scannerControls = null;
    }
  }

  showMessage(message: string): void {
    this.message = message;
    setTimeout(() => {
      this.message = null;
    }, 2000); // Clear the message after 2 seconds
  }

  ngOnDestroy(): void {
    this.stopScan();
  }
}

