import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CenterManagementComponent } from './center-management.component';

describe('CenterManagementComponent', () => {
  let component: CenterManagementComponent;
  let fixture: ComponentFixture<CenterManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
