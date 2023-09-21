import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridToolbarService {
  private pageSize = new Subject<number>();
  private gridSearchQuery = new Subject<string>();

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

}
