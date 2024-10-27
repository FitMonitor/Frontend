import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmachinemodalComponent } from './addmachinemodal.component';

describe('AddmachinemodalComponent', () => {
  let component: AddmachinemodalComponent;
  let fixture: ComponentFixture<AddmachinemodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddmachinemodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddmachinemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
