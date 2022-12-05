import { ComponentFixture, TestBed } from '@angular/core/testing';

import { otpComponent } from './otp.component';

describe('ChecklistApprovalComponent', () => {
  let component: otpComponent;
  let fixture: ComponentFixture<otpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ otpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(otpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
