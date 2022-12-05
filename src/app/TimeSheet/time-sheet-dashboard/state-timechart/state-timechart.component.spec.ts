import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateTimechartComponent } from './state-timechart.component';

describe('StateTimechartComponent', () => {
  let component: StateTimechartComponent;
  let fixture: ComponentFixture<StateTimechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateTimechartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateTimechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
