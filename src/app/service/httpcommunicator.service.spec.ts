import { TestBed } from '@angular/core/testing';

import { HTTPCommunicatorService } from './httpcommunicator.service';

describe('HTTPCommunicatorService', () => {
  let service: HTTPCommunicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HTTPCommunicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
