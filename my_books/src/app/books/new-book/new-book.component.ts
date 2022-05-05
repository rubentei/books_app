import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';
import { Author } from 'src/app/authors/author.model';
import { AuthorsService } from 'src/app/authors/authors.service';
import { BooksService } from '../books.service';

@Component ({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})

export class NewBookComponent implements OnInit, OnDestroy {
  selectAuthorId: string;
  selectAuthorValue: string;
  publishDate: string;

  @ViewChild(MatDatepicker) picker: MatDatepicker<Date>;

  authors: Author[] = [];
  authorSubscription: Subscription;

  constructor(private bookService: BooksService, private dialogRef: MatDialog, private authorsService: AuthorsService) {

  }

  ngOnInit(): void {
    this.authorsService.getAuthors();
    this.authorSubscription = this.authorsService.getCurrentAuthorsListener()
    .subscribe((authors: Author[]) => {
        this.authors = authors;
    });
  }

  selected(event: MatSelectChange) {
    this.selectAuthorValue = (event.source.selected as MatOption).viewValue;
  }

  saveBook(form: NgForm) {

    if(form.valid) {
      const authorRequest = {
        id: this.selectAuthorId,
        completeName: this.selectAuthorValue
      }

      const bookRequest = {
        id: null,
        description: form.value.description,
        title: form.value.title,
        author: authorRequest,
        price: parseInt(form.value.price),
        publishDate: new Date(this.publishDate)
      };

      this.bookService.saveBook(bookRequest);
      this.authorSubscription = this.bookService.saveBookListener()
        .subscribe( () => {
            this.dialogRef.closeAll();
        });
    }
  }

  ngOnDestroy(): void {
    this.authorSubscription.unsubscribe();
  }
}
