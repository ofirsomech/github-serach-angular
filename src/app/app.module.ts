import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from './interceptors/jwt.Interceptor';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { ReposListComponent } from './components/repos-list/repos-list.component';


export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    BookmarksComponent,
    LoginComponent,
    ReposListComponent,
    NavbarComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: [],
      },
    }),
    MatGridListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
