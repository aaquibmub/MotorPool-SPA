import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GridActionService {
  private actionMenus = new Subject<boolean[]>();

  constructor() { }

  getActionMenusState(): Observable<boolean[]> {
    return this.actionMenus.asObservable();
  }

  setActionMenusState(state: boolean[]): void {
    this.actionMenus.next(state);
  }

}
