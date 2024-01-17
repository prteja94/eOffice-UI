import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanSearchComponent } from './scan-search.component';

describe('ScanSearchComponent', () => {
  let component: ScanSearchComponent;
  let fixture: ComponentFixture<ScanSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScanSearchComponent]
    });
    fixture = TestBed.createComponent(ScanSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
