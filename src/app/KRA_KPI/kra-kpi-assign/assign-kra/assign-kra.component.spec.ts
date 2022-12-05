import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignKRAComponent } from './assign-kra.component';

describe('AssignKRAComponent', () => {
  let component: AssignKRAComponent;
  let fixture: ComponentFixture<AssignKRAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignKRAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignKRAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
