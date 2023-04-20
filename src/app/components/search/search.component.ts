import { Component, OnInit } from '@angular/core';
import { Repository } from '../../models/repository';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SearchService } from '../../services/search.service';
import { BookmarkService } from '../../services/bookmark.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  searchQuery = '';
  searchResults: Repository[] = [];
  bookmarks: Repository[] = [];
  loading = false;

  constructor(
    private searchService: SearchService,
    private bookmarkService: BookmarkService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Load the bookmarks from the database
    this.bookmarkService.getAll().subscribe((data) => {
      this.bookmarks = data;
    });

    // If there are cached search results, use them to populate the search results and update the bookmark status
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
}
