import { TestBed } from '@angular/core/testing';

import { TwilioService } from './twilio.service';

describe('NotificationService', () => {
  let service: TwilioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwilioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});