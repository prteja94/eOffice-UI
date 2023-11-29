import { TestBed } from '@angular/core/testing';

import { ExternalLocationService } from './external-location.service';

describe('ExternalLocationService', () => {
  let service: ExternalLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
