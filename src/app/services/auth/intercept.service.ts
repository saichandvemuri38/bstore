import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { AuthService } from './auth.service';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptService implements HttpInterceptor {
  constructor(public injectoror: Injector) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.injectoror.get(AuthService)
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token.getToken()}`
      }
    })
    return next.handle(tokenizedReq);
  }
}
@Injectable({
  providedIn: 'root'
})
export class LoaderService implements HttpInterceptor {
  constructor(public spinner: SpinnerService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.requestStart();
    return next.handle(req).pipe(finalize(() => {
      this.spinner.requestEnd();
    })
    );
  }
}
