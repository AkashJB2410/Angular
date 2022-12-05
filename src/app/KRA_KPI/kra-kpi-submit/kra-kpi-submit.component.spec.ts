import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KraKpiSubmitComponent } from './kra-kpi-submit.component';

describe('KraKpiSubmitComponent', () => {
  let component: KraKpiSubmitComponent;
  let fixture: ComponentFixture<KraKpiSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KraKpiSubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KraKpiSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
