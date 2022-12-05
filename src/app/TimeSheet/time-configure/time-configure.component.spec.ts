import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeConfigureComponent } from './time-configure.component';

describe('TimeConfigureComponent', () => {
  let component: TimeConfigureComponent;
  let fixture: ComponentFixture<TimeConfigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeConfigureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
