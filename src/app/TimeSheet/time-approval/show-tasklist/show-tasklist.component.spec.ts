import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTasklistComponent } from './show-tasklist.component';

describe('ShowTasklistComponent', () => {
  let component: ShowTasklistComponent;
  let fixture: ComponentFixture<ShowTasklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowTasklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTasklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
