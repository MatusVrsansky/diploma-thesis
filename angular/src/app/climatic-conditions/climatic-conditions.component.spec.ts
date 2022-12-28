import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimaticConditionsComponent } from './climatic-conditions.component';

describe('ClimatiConditionsComponent', () => {
  let component: ClimaticConditionsComponent;
  let fixture: ComponentFixture<ClimaticConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClimaticConditionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimaticConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
