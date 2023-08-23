import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private showSubMenu = new Subject<boolean>();
  private showUserMenu = new Subject<boolean>();
  private showSettingsMenu = new Subject<boolean>();
  private showNotificationTicker = new Subject<boolean>();
  constructor() { }

  getSidebarSubMenuState(): Observable<boolean> {
    return this.showSubMenu.asObservable();
  }

  setSidebarSubMenuState(state: boolean): void {
    if (state === true) {
      this.setSettingsMenuState(false);
      this.setUserMenuState(false);
      this.setNotificationTickerState(false);
    }
    this.showSubMenu.next(state);
  }


  getUserMenuState(): Observable<boolean> {
    return this.showUserMenu.asObservable();
  }

  setUserMenuState(state: boolean): void {
    this.showSettingsMenu.next(false);
    this.showUserMenu.next(state);
  }


  getSettingsMenuState(): Observable<boolean> {
    return this.showSettingsMenu.asObservable();
  }

  setSettingsMenuState(state: boolean): void {
    this.showUserMenu.next(false);
    this.showSettingsMenu.next(state);
  }


  getNotificationTickerState(): Observable<boolean> {
    return this.showNotificationTicker.asObservable();
  }

  setNotificationTickerState(state: boolean): void {
    this.showNotificationTicker.next(state);
  }
}
