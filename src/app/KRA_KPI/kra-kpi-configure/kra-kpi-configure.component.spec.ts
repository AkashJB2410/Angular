import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KraKpiConfigureComponent } from './kra-kpi-configure.component';

describe('KraKpiConfigureComponent', () => {
  let component: KraKpiConfigureComponent;
  let fixture: ComponentFixture<KraKpiConfigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KraKpiConfigureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KraKpiConfigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
