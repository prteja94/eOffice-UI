import { TestBed } from '@angular/core/testing';

import { ScanningIndexService } from './scanning-index.service';

describe('ScanningIndexService', () => {
  let service: ScanningIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScanningIndexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
