import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../../services/bookmark-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent implements OnInit {
  bookmarks: any[] = [];

  constructor(private bookmarkService: BookmarkService) {}

  ngOnInit() {
    this.bookmarkService.getAll().subscribe((bookmarks) => {
      this.bookmarks = bookmarks;
      console.log(bookmarks)
    });
  }

  removeBookmark(bookmark: any) {
    this.bookmarkService.delete(bookmark);
  }
}
