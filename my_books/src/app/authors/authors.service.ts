import { Injectable } from "@angular/core";
import { Author } from "./author.model";
import { environment } from "./../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  baseUrl = environment.baseUrl;
  private authorsList: Author[] = [];
  private authorsSubject = new Subject<Author[]>();

  constructor(private http: HttpClient) {

  }

  getAuthors(): void {
    this.http.get<Author[]>(this.baseUrl + 'api/author')
    .subscribe((data) => {
      this.authorsList = data;
      this.authorsSubject.next([...this.authorsList]);
    });
  }

  getCurrentAuthorsListener(): Observable<Author[]> {
    return this.authorsSubject.asObservable();
  }
}
