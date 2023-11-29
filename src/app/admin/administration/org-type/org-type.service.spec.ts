import { TestBed } from '@angular/core/testing';

import { OrgTypeService } from './org-type.service';

describe('OrgTypeService', () => {
  let service: OrgTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrgTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
