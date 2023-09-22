import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../services/common/alert.service';

@Injectable()

export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private alertService: AlertService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error.status === 401) {
          this.router.navigate(['/auth/sign-in']);
          return throwError(error.statusText);
        }
        if (error.status === 403) {
          this.alertService.setErrorAlert('You do not have permission to perform this action');
          return throwError(error.statusText);
        }
        if (error instanceof HttpErrorResponse) {
          const appError = error.headers.get('Application-Error');
          if (appError) {
            this.alertService.setErrorAlert(appError);
            return throwError(appError);
          }

          const serverError = error.error;
          let modelErrors = '';
          if (serverError.errors && typeof serverError.errors === 'object') {
            for (const key in serverError.errors) {
              if (serverError.errors[key]) {
                modelErrors += serverError.errors[key] + '\n';
              }
            }
          }
          // this.alertService.setErrorAlert(modelErrors || serverError || 'Server Error');
          return throwError(modelErrors || serverError || 'Server Error');
        }
        return throwError('Error!!');
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
