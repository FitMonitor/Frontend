import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMachineComponent } from './addmachine.component';

describe('AddmachineComponent', () => {
  let component: AddMachineComponent;
  let fixture: ComponentFixture<AddMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddMachineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
