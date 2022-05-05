import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Author } from './author.model';
import { AuthorsService } from './authors.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit, OnDestroy {

  deployColumns = ['name', 'lastname', 'schoolGrade'];
  dataSource = new MatTableDataSource<Author>();

  private authorSubscription: Subscription;

  constructor(private authorsService: AuthorsService) { }

  ngOnInit(): void {
    this.authorsService.getAuthors();
    this.authorSubscription = this.authorsService.getCurrentAuthorsListener()
      .subscribe((authors: Author[]) => {
        this.dataSource.data = authors;
      });
  }

  ngOnDestroy(): void {
    this.authorSubscription.unsubscribe();
  }

}
