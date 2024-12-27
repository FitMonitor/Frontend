import { Component, OnInit, OnDestroy } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import {ApiService} from "../service/api.service";

@Component({
  selector: 'app-qr-code-scanner-entrance',
  standalone: true,
  imports: [NgIf,NavbarComponent],
  templateUrl: './qr-code-scanner-entrance.component.html',
  styleUrl: './qr-code-scanner-entrance.component.css'
})
export class QrCodeScannerEntranceComponent implements OnInit, OnDestroy {
  private scanner: BrowserMultiFormatReader;
    scanResult: string | null = null;
    private scannerControls: any | null = null; 
    private timeout:number = 5000;

    constructor(private apiService:ApiService,private router: Router) {
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
            const testData = {
              "token": "eyJraWQiOiJFV3R1YUNDTmtGd041VjRISGdaaXJUbWZ3MGZUUnBuRFZheVZWbGNEUlhRPSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiSDhoOVJKMHVXTDlwSFFjb2JPTVRoQSIsInN1YiI6ImEwMmM4OThjLTYwYzEtNzA0My0yMTgzLTFjOWMwMjMwNzMxMCIsImNvZ25pdG86Z3JvdXBzIjpbIkFkbWluIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtbm9ydGgtMS5hbWF6b25hd3MuY29tXC9ldS1ub3J0aC0xX0FXSlJWVmdNcyIsImNvZ25pdG86dXNlcm5hbWUiOiJhMDJjODk4Yy02MGMxLTcwNDMtMjE4My0xYzljMDIzMDczMTAiLCJvcmlnaW5fanRpIjoiYmJhNzhlMmMtN2NiYi00ZTQwLWI5NzQtOTQ1OTUzZWI2NWQ4IiwiYXVkIjoiNTE3cG5vMGVyZWU0MzhhZ3E3MHZ0NTBidm8iLCJldmVudF9pZCI6ImY2YTY1OTNjLTIwNDItNDliZC05MDcxLWNhMTVmMGY3ZjFlZCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzM1MzI1MjcxLCJleHAiOjE3MzUzMjg4NzEsImlhdCI6MTczNTMyNTI3MSwianRpIjoiZTY1YmYxZDgtZmVmNC00ZDk3LTkwOGEtNTJiZjQzOWFmMDI4IiwiZW1haWwiOiJkaW9nb21wc2lsdmExOTA0QGdtYWlsLmNvbSJ9.OZvSytJ18ZcBpAdy6YWxdzPKM5obisbhDT2-xqtXx9O4dTLQs42bmKCp6JK8N5p-psGI5mM1ok5HokVZHp3i79liWHlPYULSkNMN4DpiUPqciOw-3g5HU8EXWXnFwtuaGSNScKSml7rihqEk9fVXZUH8bbuSq01VhilIm1sub1_FSdZz7IVwRti6mC-WeeMoPEUHnwXye8VJev7NcBaYSmm699bK5DhQN4xW9ByPciTdX49O6Mklik1dZvIFtrJxNa-Q-iU57rb54QQ75yKzF2aqpJvrmQ5lXc09pQ56bDqZIKOS14KBY7y5M6wp0MHInC0pDME_EzbCFxd0d7YSMw"
            }
    
            this.apiService.manageGymEntrance(testData)
              .then((response) => {
                console.log('Response:', response);
                if (response === "Entered") {
                  // Handle "Entered" response
                } else if (response === "Left") {
                  // Handle "Left" response
                } else if (response === "Full") {
                  this.router.navigate(['/user-dashboard'], { state: { popupMessage: 'The gym is full. Please try again later.' } });
                }
              })
              .catch((error) => {
                console.error('Error occurred:', error);
              });
          }
    
          if (error && error.name !== 'NotFoundException') {
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
