import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetBarchartComponent } from './timesheet-barchart.component';

describe('TimesheetBarchartComponent', () => {
  let component: TimesheetBarchartComponent;
  let fixture: ComponentFixture<TimesheetBarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimesheetBarchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesheetBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
