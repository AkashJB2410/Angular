import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KraKpiApprovalComponent } from './kra-kpi-approval.component';

describe('KraKpiApprovalComponent', () => {
  let component: KraKpiApprovalComponent;
  let fixture: ComponentFixture<KraKpiApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KraKpiApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KraKpiApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
