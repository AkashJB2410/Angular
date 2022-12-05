import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecklistDashboardComponent } from './checklist-dashboard.component';

describe('ChecklistDashboardComponent', () => {
  let component: ChecklistDashboardComponent;
  let fixture: ComponentFixture<ChecklistDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChecklistDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChecklistDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
