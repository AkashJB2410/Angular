import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartlistComponent } from './departlist.component';

describe('DepartlistComponent', () => {
  let component: DepartlistComponent;
  let fixture: ComponentFixture<DepartlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
