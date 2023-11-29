import { TestBed } from '@angular/core/testing';

import { DocumentClassificationService } from './document-classification.service';

describe('DocumentClassificationService', () => {
  let service: DocumentClassificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentClassificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
