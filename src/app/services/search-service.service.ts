import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Repository } from '../models/repository';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  lastSearchResults: Repository[] = [];
  QUERY_URL = 'GithubSearch/api/search?query=';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<Repository[]> {
    const url = `${environment.apiUrl}${this.QUERY_URL}${query}`;
    return this.http.get<any>(url).pipe(
      map((res) =>
        res.items.map((item: Repository) => {
          return {
            ...item,
            bookmarked: false,
          };
        })
      )
    );
  }
}
