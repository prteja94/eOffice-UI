import { TestBed } from '@angular/core/testing';

import { FolderMasterService } from './folder-master.service';

describe('FolderMasterService', () => {
  let service: FolderMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FolderMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
