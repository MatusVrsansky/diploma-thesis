import { TestBed } from '@angular/core/testing';

import { ClimaticConditionsService } from './climatic-conditions.service';

describe('ClimaticConditionsService', () => {
  let service: ClimaticConditionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClimaticConditionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});