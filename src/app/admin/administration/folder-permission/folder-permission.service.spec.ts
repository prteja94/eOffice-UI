import { TestBed } from '@angular/core/testing';

import { FolderPermissionService } from './folder-permission.service';

describe('FolderPermissionService', () => {
  let service: FolderPermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FolderPermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
