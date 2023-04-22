import { catchError, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Repository } from '../models/repository';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  lastSearchResults: Repository[] = []; // array to store last search results
  QUERY_URL = 'GithubSearch/api/search?query='; // endpoint for search API

  constructor(private http: HttpClient, private authService: AuthService) {}

  // search for repositories based on query
  search(query: string): Observable<Repository[]> {
    const url = `${environment.apiUrl}${this.QUERY_URL}${query}`; // construct API URL
    // make GET request to API, map each repository item to Repository object with bookmarked set to false
    return this.http.get<any>(url).pipe(
      catchError((error) => {
        if (error.status === 401) {
          // handle 401 error by redirecting to login page
        }
        this.authService.logout();
        return throwError(error);
      }),
      map((res) =>
        res.items.map((item: Repository): Repository => {
          return {
            ...item,
            bookmarked: false,
          };
        })
      )
    );
  }
}
