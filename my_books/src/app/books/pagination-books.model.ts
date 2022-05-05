import { Books } from "./books.model";

export interface PaginationBooks {
  pageSize: number;
  page: number;
  sort: string;
  sortDirection: string;
  pageQuantity: number;
  data: Books[];
  filterValue: {};
  totalRows: number;
}

