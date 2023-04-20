import { Injectable } from '@angular/core';
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}auth`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<{ token: string }> {
    const url = `${this.apiUrl}/login`;

    return this.http.post<{ token: string }>(url, { username, password }).pipe(
      tap(response => localStorage.setItem('token', response.token))
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
