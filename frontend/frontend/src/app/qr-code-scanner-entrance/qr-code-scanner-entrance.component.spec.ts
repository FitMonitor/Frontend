import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeScannerEntranceComponent } from './qr-code-scanner-entrance.component';

describe('QrCodeScannerEntranceComponent', () => {
  let component: QrCodeScannerEntranceComponent;
  let fixture: ComponentFixture<QrCodeScannerEntranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrCodeScannerEntranceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QrCodeScannerEntranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
