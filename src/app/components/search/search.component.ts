import { Component } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookmarkService } from '../../services/bookmark-service.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchQuery: string = '';
  searchResults: any[] = [];
  loading: boolean = false;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private bookmarkService: BookmarkService
  ) {}

  async search() {
    if (!this.searchQuery) return;

    this.loading = true;
    this.searchResults = [];

    try {
      const response = await this.http
        .get<any>(`${environment.apiUrl}/search?query=${this.searchQuery}`)
        .pipe(map((res) => res.items))
        .toPromise();

      this.searchResults = response;
    } catch (error) {
      this.snackBar.open('Failed to search for repositories.', 'Dismiss', {
        duration: 3000,
      });
    }

    this.loading = false;
  }

  async bookmark(repository: any) {
    try {
      await this.bookmarkService.createBookmark(repository);
      this.snackBar.open('Bookmark created.', 'Dismiss', { duration: 3000 });
    } catch (error) {
      this.snackBar.open('Failed to create bookmark.', 'Dismiss', {
        duration: 3000,
      });
    }
  }
}
