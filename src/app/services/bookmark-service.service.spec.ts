import { TestBed } from '@angular/core/testing';
import {BookmarkService} from "./bookmark-service.service";



describe('BookmarkServiceService', () => {
  let service: BookmarkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookmarkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
