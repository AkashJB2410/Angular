import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChecklistAppquesansComponent } from './checklist-appQuesAns.component';

describe('ChecklistApprovalComponent', () => {
  let component: ChecklistAppquesansComponent;
  let fixture: ComponentFixture<ChecklistAppquesansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChecklistAppquesansComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistAppquesansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
