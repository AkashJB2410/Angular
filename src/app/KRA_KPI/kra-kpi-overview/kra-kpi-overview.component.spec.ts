import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KraKpiOverviewComponent } from './kra-kpi-overview.component';

describe('KraKpiOverviewComponent', () => {
  let component: KraKpiOverviewComponent;
  let fixture: ComponentFixture<KraKpiOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KraKpiOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KraKpiOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
