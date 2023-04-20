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

  bookmark(result: any) {
    result.bookmarked = !result.bookmarked;
    if (result.bookmarked) {
      this.bookmarkService.create(result);
    } else {
      this.bookmarkService.delete(result.id);
    }
  }
}
