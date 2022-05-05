import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RegisterComponent } from './security/register/register.component';
import { LoginComponent } from './security/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BarComponent } from './navigation/bar/bar.component';
import { ListMenuComponent } from './navigation/list-menu/list-menu.component';
import { SecurityService } from './security/security.service';
import { BooksComponent } from './books/books.component';
import { BooksService } from './books/books.service';
import { NewBookComponent } from './books/new-book/new-book.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AuthorsComponent } from './authors/authors.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityInterceptor } from './security/security-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    BarComponent,
    ListMenuComponent,
    NewBookComponent,
    AuthorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: SecurityInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
  bootstrap: [AppComponent],
  entryComponents: [NewBookComponent]
})
export class AppModule { }
