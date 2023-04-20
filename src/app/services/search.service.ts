import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Repository } from '../models/repository';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  lastSearchResults: Repository[] = []; // array to store last search results
  QUERY_URL = 'GithubSearch/api/search?query='; // endpoint for search API

  constructor(private http: HttpClient) {}

  // search for repositories based on query
  search(query: string): Observable<Repository[]> {
    const url = `${environment.apiUrl}${this.QUERY_URL}${query}`; // construct API URL
    // make GET request to API, map each repository item to Repository object with bookmarked set to false
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
