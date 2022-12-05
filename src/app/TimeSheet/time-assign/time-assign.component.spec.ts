import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeAssignComponent } from './time-assign.component';

describe('TimeAssignComponent', () => {
  let component: TimeAssignComponent;
  let fixture: ComponentFixture<TimeAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeAssignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
