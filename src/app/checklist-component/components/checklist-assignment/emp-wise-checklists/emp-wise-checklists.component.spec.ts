import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpWiseChecklistsComponent } from './emp-wise-checklists.component';

describe('EmpWiseChecklistsComponent', () => {
  let component: EmpWiseChecklistsComponent;
  let fixture: ComponentFixture<EmpWiseChecklistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpWiseChecklistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpWiseChecklistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
