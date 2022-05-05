import { Books } from "./books.model";
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { PaginationBooks } from "./pagination-books.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  baseUrl = environment.baseUrl;

  private booksList: Books[] = []

  bookSubject = new Subject();

  bookPagination: PaginationBooks;
  bookPaginationSubject = new Subject<PaginationBooks>();

  constructor(private http: HttpClient) {}

  getBooks(bookPerPage: number, currentPage: number, sortBy: string, sortDirection: string, filterValue: any): void {
    const request = {
      pageSize: bookPerPage,
      page: currentPage,
      sort: sortBy,
      sortDirection,
      filterValue
    };

    this.http.post<PaginationBooks>(this.baseUrl + 'api/book/pagination', request)
    .subscribe( (dataResponse) => {
      this.bookPagination = dataResponse;
      this.bookPaginationSubject.next(this.bookPagination);
    });
  }

  getCurrentBooksListener(): Observable<PaginationBooks> {
    return this.bookPaginationSubject.asObservable();
  }

  saveBook(book: Books): void {
    this.http.post(this.baseUrl + 'api/book', book)
        .subscribe((response) =>{
          this.bookSubject.next(book);
        });
  }

  saveBookListener(){
    return this.bookSubject.asObservable();
  }

}
