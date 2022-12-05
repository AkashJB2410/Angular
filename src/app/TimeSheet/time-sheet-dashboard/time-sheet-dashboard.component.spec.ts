import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetDashboardComponent } from './time-sheet-dashboard.component';

describe('TimeSheetDashboardComponent', () => {
  let component: TimeSheetDashboardComponent;
  let fixture: ComponentFixture<TimeSheetDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeSheetDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
