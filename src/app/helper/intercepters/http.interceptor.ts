import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { OverlayService } from '../services/common/overlay.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  private count = 0;
  constructor(
    private overlayService: OverlayService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var showLoader = this.showLoader(req);
    if (showLoader && this.count === 0) {
      // debugger;
      this.overlayService.setShowHideLoader(true);
    }
    if (showLoader) {
      this.count++;
    }
    return next.handle(req).pipe(
      finalize(() => {

        if (this.showLoader(req)) {
          this.count--;
        }
        if (this.count === 0) {
          // debugger;
          this.overlayService.setShowHideLoader(false);
        }
      })
    );
  }

  showLoader(req: HttpRequest<any>): boolean {
    return !(req.url.includes('getnotificationlist')
      || req.url.includes('getdropdownlist'));
  }
}
