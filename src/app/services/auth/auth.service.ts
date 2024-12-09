import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, combineLatest, map, throwError } from 'rxjs';
import { environments } from 'src/app/env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public Url = environments.baseUrl;

  constructor(private _http: HttpClient, private _router: Router) { }

  public postUserdata(x: any): Observable<any> {
    return this._http.post<any>(this.Url + 'register', x).pipe(catchError(this.errorHandler));
  }
  public postLogin(x: any): Observable<any> {
    return this._http.post<any>(this.Url + 'login', x).pipe(catchError(this.errorHandler));
  }
  public loggedIn() {
    return !!sessionStorage.getItem('token');
  }
  public logOut() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('payload');
    this._router.navigate(['/login']);
  }
  public getToken() {
    return sessionStorage.getItem('token');
  }
  public getRole(){
    return sessionStorage.getItem('token');
  }
  public getPayload(){
    return JSON.parse(sessionStorage.getItem('payload'));
  }
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  public canActivateProtectedRoutes$: Observable<boolean> = combineLatest([
    this.isAuthenticated$,
    // this.isDoneLoading$,
  ]).pipe(map((values) => values.every((b) => b)));

  public errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Unknown Server Error");
  }
}
