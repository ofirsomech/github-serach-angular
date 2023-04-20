import { Component, Input } from '@angular/core';
import { BookmarkService } from '../../services/bookmark-service.service';
import { Repository } from '../../models/repository';

@Component({
  selector: 'app-repos-list',
  templateUrl: './repos-list.component.html',
  styleUrls: ['./repos-list.component.css'],
})
export class ReposListComponent {
  @Input() searchResults: Repository[] = [];
  @Input() loading: boolean = false;

  constructor(private bookmarkService: BookmarkService) {}

  // Toggles the bookmark status of a repository and adds or removes it from the bookmark list
  bookmark(result: Repository) {
    result.bookmarked = !result.bookmarked;
    if (result.bookmarked) {
      this.bookmarkService.create(result);
    } else {
      this.bookmarkService.delete(result);
    }
  }
}
