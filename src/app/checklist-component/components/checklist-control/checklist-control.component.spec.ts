import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistControlComponent } from './checklist-control.component';

describe('ChecklistControlComponent', () => {
  let component: ChecklistControlComponent;
  let fixture: ComponentFixture<ChecklistControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
