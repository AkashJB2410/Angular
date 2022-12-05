import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistSubmitComponent } from './checklist-submit.component';

describe('ChecklistSubmitComponent', () => {
  let component: ChecklistSubmitComponent;
  let fixture: ComponentFixture<ChecklistSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

