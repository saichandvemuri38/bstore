import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { environments } from '../env';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public Url = environments.baseUrl;

  constructor(private _http: HttpClient, private _router: Router) { }

  public addLibrary(x: any): Observable<any> {
    return this._http.post<any>(this.Url + 'add-library', x).pipe(catchError(this.errorHandler));
  }
  public post(url: string, body: any) {
    return this._http.post<any>(this.Url + url, body).pipe(catchError(this.errorHandler));
  }
  public get(url: any, body?: any) {
    return this._http.get<any>(this.Url + url, body).pipe(catchError(this.errorHandler))
  }
  public delete(url: any, body: any) {
    return this._http.delete<any>(this.Url + url, body).pipe(catchError(this.errorHandler));
  }
  public errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "Unknown Server Error");
  }
}
