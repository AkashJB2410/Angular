import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MISreportComponent } from './misreport.component';

describe('MISreportComponent', () => {
  let component: MISreportComponent;
  let fixture: ComponentFixture<MISreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MISreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MISreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
