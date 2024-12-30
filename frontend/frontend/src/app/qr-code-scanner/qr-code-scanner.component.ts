import { Component, OnInit, OnDestroy } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { ApiService } from "../service/api.service";

@Component({
  selector: 'app-qr-code-scanner',
  standalone: true,
  imports: [NgIf, NavbarComponent],
  templateUrl: './qr-code-scanner.component.html',
  styleUrl: './qr-code-scanner.component.css'
})
export class QrCodeScannerComponent implements OnInit, OnDestroy {
  private scanner: BrowserMultiFormatReader;
  scanResult: string | null = null;
  private scannerControls: any | null = null;

  constructor(private apiService: ApiService, private router: Router) {
    this.scanner = new BrowserMultiFormatReader();
  }

  ngOnInit(): void {}

  startScan(): void {
    const videoElement = document.querySelector('video') as HTMLVideoElement;
    this.scanner.decodeFromVideoDevice(undefined, videoElement, (result, error, controls) => {
      if (controls) {
        this.scannerControls = controls; // Save the scanner controls
      }
      if (result) {
        this.scanResult = result.getText();
        const qr_code_data = {
          "machineId": this.scanResult, 
          "intention": 'use'
        };

        this.apiService.sendMachineStatus(qr_code_data)
          .then((response) => {
            let message = "";
            if (response == "False") {
              message = "Machine already in use";
            } else if (response == "True") {
              message = "You are now using the machine";
            } else if (response == "User already using a machine") {
              message = "You are already using a machine";
            } else {
              message = "Unexpected response from the server.";
            }

            // Redirect to the homepage with the message
            this.router.navigate(['/machine-status'], { state: { message: message } });

            console.log('Message:', message);
          })
          .catch((error) => {
            console.error('Error occurred:', error);
            const message = "Failed to update machine status. Please try again.";
            this.router.navigate(['/machine-status'], { state: { message } });
          });

        this.stopScan(); // Automatically stop scanning after a result
      }
      if (error && error.name !== 'NotFoundException2') {
        console.error(error);
      }
    });
  }

  stopScan(): void {
    if (this.scannerControls) {
      this.scannerControls.stop(); // Stop the scanner using the controls
      this.scannerControls = null; // Clear the reference
    }
  }

  ngOnDestroy(): void {
    this.stopScan();
  }
}
