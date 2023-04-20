import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Gourds/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
  {
    path: 'bookmarks',
    component: BookmarksComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
