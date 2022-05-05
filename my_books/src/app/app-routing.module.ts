import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorsComponent } from './authors/authors.component';
import { BooksComponent } from './books/books.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { SecurityRouter } from './security/security.router';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [SecurityRouter] },
  { path: 'registro', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'libros', component: BooksComponent , canActivate: [SecurityRouter]},
  { path: 'autores', component: AuthorsComponent, canActivate: [SecurityRouter] },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SecurityRouter]
})
export class AppRoutingModule { }
