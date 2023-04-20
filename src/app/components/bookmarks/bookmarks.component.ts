import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../../services/bookmark-service.service';
import { Observable } from 'rxjs';
import { Repository } from '../../models/repository';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent implements OnInit {
  bookmarks: Repository[] = [];

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit() {
    this.bookmarkService.getAll().subscribe((bookmarks) => {
      this.bookmarks = bookmarks;
    });
  }

  // Remove the specified bookmark using the bookmark service
  removeBookmark(bookmark: Repository) {
    this.bookmarkService.delete(bookmark);
  }
}
