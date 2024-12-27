  import { Component, OnInit, OnDestroy } from '@angular/core';
  import { BrowserMultiFormatReader } from '@zxing/browser';
  import { NgIf } from '@angular/common';
  import { NavbarComponent } from "../navbar/navbar.component";
  import {ApiService} from "../service/api.service";

  @Component({
    selector: 'app-qr-code-scanner',
    standalone: true,
    imports: [NgIf,NavbarComponent],
    templateUrl: './qr-code-scanner.component.html',
    styleUrl: './qr-code-scanner.component.css'
  })
  export class QrCodeScannerComponent implements OnInit,OnDestroy {
    private scanner: BrowserMultiFormatReader;
    scanResult: string | null = null;
    private scannerControls: any | null = null; 

    constructor(private apiService:ApiService) {
      this.scanner = new BrowserMultiFormatReader();
    }

    ngOnInit(): void {}

    startScan(): void {
      const videoElement = document.querySelector('video') as HTMLVideoElement;
      this.scanner.decodeFromVideoDevice(undefined, videoElement, (result, error,controls) => {
        if (controls) {
          this.scannerControls = controls; // Save the scanner controls
        }
        if (result) {
          this.scanResult = result.getText();
          const testData = {
            "machineId": '1',
            "intention": 'use'
          };
          this.apiService.sendMachineStatus(testData)
            .then((response) => {
              // Check the response value and show the message if needed
              console.log('Response:', response);
              if (response=="False") {
                console.log("1")

              }
              else if (response=="True"){
                console.log("2")
              }
            })
            .catch((error) => {
              console.error('Error occurred:', error);
              //this.errorMessage = 'Failed to update machine status.';
            });


          this.stopScan(); // Automatically stop scanning after a result
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
