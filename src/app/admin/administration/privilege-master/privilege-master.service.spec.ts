import { TestBed } from '@angular/core/testing';

import { PrivilegeMasterService } from './privilege-master.service';

describe('PrivilegeMasterService', () => {
  let service: PrivilegeMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrivilegeMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
