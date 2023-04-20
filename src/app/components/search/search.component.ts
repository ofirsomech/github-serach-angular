import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookmarkService } from '../../services/bookmark-service.service';
import { Repository } from '../../models/repository';
import { SearchService } from '../../services/search-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchQuery = '';
  searchResults: Repository[] = [];
  bookmarks: any[] = [];
  loading = false;

  constructor(
    private searchService: SearchService,
    private snackBar: MatSnackBar,
    private bookmarkService: BookmarkService
  ) {}

  ngOnInit(): void {
    this.bookmarkService.getAll().subscribe((data) => {
      this.bookmarks = data;
    });

    if (this.searchService.lastSearchResults.length > 0) {
      this.searchResults = this.searchService.lastSearchResults.map(
        (item: Repository) => {
          const bookmark = this.bookmarks.find((b) => b.id === item.id);
          if (bookmark) {
            item.bookmarked = true;
          }
          return item;
        }
      );
    }
  }

  async search() {
    if (!this.searchQuery) return;

    this.loading = true;
    this.searchResults = [];

    try {
      const response = await this.searchService
        .search(this.searchQuery)
        .toPromise();

      if (response) {
        this.searchResults = response.map((item: Repository) => {
          const bookmark = this.bookmarks.find((b) => b.id === item.id);
          if (bookmark) {
            item.bookmarked = true;
          }
          return item;
        });

        this.searchService.lastSearchResults = this.searchResults;
      }
    } catch (error) {
      this.snackBar.open('Failed to search for repositories.', 'Dismiss', {
        duration: 3000,
      });
    }

    this.loading = false;
  }

  async bookmark(repository: any) {
    try {
      await this.bookmarkService.create(repository);
      repository.bookmarked = true;
      this.snackBar.open('Bookmark created.', 'Dismiss', { duration: 3000 });
    } catch (error) {
      this.snackBar.open('Failed to create bookmark.', 'Dismiss', {
        duration: 3000,
      });
    }
  }
}
