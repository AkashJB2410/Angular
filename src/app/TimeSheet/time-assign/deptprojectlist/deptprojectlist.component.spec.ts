import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptprojectlistComponent } from './deptprojectlist.component';

describe('DeptprojectlistComponent', () => {
  let component: DeptprojectlistComponent;
  let fixture: ComponentFixture<DeptprojectlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptprojectlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptprojectlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
