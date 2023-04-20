import { TestBed } from '@angular/core/testing';

import { BookmarkServiceService } from './bookmark-service.service';

describe('BookmarkServiceService', () => {
  let service: BookmarkServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookmarkServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
