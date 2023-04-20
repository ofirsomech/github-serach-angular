import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private readonly STORAGE_KEY = 'bookmarks';
  private bookmarks: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() {
    const itemStorage = localStorage.getItem(this.STORAGE_KEY) ?? '';
    // Check if there are any bookmarks saved in local storage

    const bookmarks = itemStorage ? JSON.parse(itemStorage) : [];
    if (bookmarks) {
      this.bookmarks.next(bookmarks);
    }
  }

  // Returns an Observable that emits the current bookmarks array
  getAll(): Observable<any[]> {
    return this.bookmarks.asObservable();
  }

  // Adds a new bookmark to the bookmarks array
  create(bookmark: any): void {
    const updatedBookmarks = [...this.bookmarks.value, bookmark];
    this.bookmarks.next(updatedBookmarks);
    // Save updated bookmarks to local storage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedBookmarks));
  }

  // Removes a bookmark from the bookmarks array
  delete(bookmark: any): void {
    const updatedBookmarks = this.bookmarks.value.filter(
      (b) => b.id !== bookmark.id
    );
    this.bookmarks.next(updatedBookmarks);
    // Save updated bookmarks to local storage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedBookmarks));
  }
}
