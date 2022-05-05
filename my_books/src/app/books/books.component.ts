import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BooksService } from './books.service';
import { Books } from './books.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { NewBookComponent } from './new-book/new-book.component';
import { Subscription } from 'rxjs';
import { PaginationBooks } from './pagination-books.model';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, AfterViewInit, OnDestroy {
  timeout: any = null;
  booksList: Books[] = [];
  deployColumns = ["title", "description", "author", "price"];
  dataSource = new MatTableDataSource<Books>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private bookSubscription: Subscription;
  totalBooks = 0;
  booksPerPage = 2;
  pageSizeCombo = [1, 2, 5, 10];
  currentPage = 1;
  sortBy = 'title';
  sortDirection = 'asc';
  filterValue = null;

  constructor(private booksService: BooksService, private dialog: MatDialog) { }

  paginationEvent(event: PageEvent): void {
    this.booksPerPage = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.booksService.getBooks(
      this.booksPerPage,
      this.currentPage,
      this.sortBy,
      this.sortDirection,
      this.filterValue
    );
  }

  sortColumn(event): void {
    this.sort = event.active;
    this.sortDirection = event.direction;
    this.booksService.getBooks(
      this.booksPerPage,
      this.currentPage,
      event.active,
      event.direction,
      this.filterValue
    );
  }

  onKeyUp(event: KeyboardEvent): void {
    const target = event.target as HTMLTextAreaElement;

    clearTimeout(this.timeout);
    const $this = this;
    this.timeout = setTimeout( () => {
      if (event.key != 'Enter') {
        const localFilterValue = {
          property: 'title',
          value: target.value
        };
        $this.filterValue = localFilterValue;
        $this.booksService.getBooks(
          $this.booksPerPage,
          $this.currentPage,
          $this.sortBy,
          $this.sortDirection,
          localFilterValue
        );
      }

    }, 1000);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewBookComponent, {
      width: '550px'
    });

    dialogRef.afterClosed()
      .subscribe(() => {
        this.booksService.getBooks(
          this.booksPerPage,
          this.currentPage,
          this.sortBy,
          this.sortDirection,
          this.filterValue
        );
      });
  }

  ngOnInit(): void {
    this.booksService.getBooks(
      this.booksPerPage,
      this.currentPage,
      this.sortBy,
      this.sortDirection,
      this.filterValue
    );

    this.bookSubscription = this.booksService
      .getCurrentBooksListener()
      .subscribe((pagination: PaginationBooks) => {
        this.dataSource = new MatTableDataSource<Books>(pagination.data);
        this.totalBooks = pagination.totalRows;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe();
  }

}
