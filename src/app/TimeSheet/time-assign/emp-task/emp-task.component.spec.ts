import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpTaskComponent } from './emp-task.component';

describe('EmpTaskComponent', () => {
  let component: EmpTaskComponent;
  let fixture: ComponentFixture<EmpTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
