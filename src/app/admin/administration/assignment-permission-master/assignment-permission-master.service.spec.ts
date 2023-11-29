import { TestBed } from '@angular/core/testing';

import { AssignmentPermissionMasterService } from './assignment-permission-master.service';

describe('AssignmentPermissionMasterService', () => {
  let service: AssignmentPermissionMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentPermissionMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
