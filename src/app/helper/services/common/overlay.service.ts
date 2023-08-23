import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  private showAlert = new Subject<boolean>();
  private showLoader = new Subject<boolean>();

  constructor() { }

  getShowHideAlert(): Observable<boolean> {
    return this.showAlert.asObservable();
  }

  setShowHideAlert(flag: boolean): void {
    this.showAlert.next(flag);
  }

  getShowHideLoader(): Observable<boolean> {
    return this.showLoader.asObservable();
  }
  setShowHideLoader(flag: boolean): void {
    this.showLoader.next(flag);
  }

}
