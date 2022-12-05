import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KraKpiAssignComponent } from './kra-kpi-assign.component';

describe('KraKpiAssignComponent', () => {
  let component: KraKpiAssignComponent;
  let fixture: ComponentFixture<KraKpiAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KraKpiAssignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KraKpiAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
