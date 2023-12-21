import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridToolbarService {
  private pageSize = new Subject<number>();
  private gridSearchQuery = new Subject<string>();
  private gridColumn = new Subject<string>();

  constructor() { }

  getPageSize(): Observable<number> {
    return this.pageSize.asObservable();
  }

  setPageSize(pageSize: number): void {
    this.pageSize.next(pageSize);
  }

  getGridSearchQuery(): Observable<string> {
    return this.gridSearchQuery.asObservable();
  }
  setGridSearchQuery(query: string): void {
    this.gridSearchQuery.next(query);
  }

  getGridHiddenColumn(): Observable<string> {
    return this.gridColumn.asObservable();
  }
  setGridHiddenColumn(column: string): void {
    this.gridColumn.next(column);
  }

}
