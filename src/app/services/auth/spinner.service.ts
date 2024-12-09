import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private count = 0;
  private spinner$ = new BehaviorSubject<string>('');
  constructor() {}
  getSpinnerObservable(): Observable<string> {
    return this.spinner$.asObservable();
  }
  // need to start spinner
  requestStart() {
    if (++this.count === 1) {
      this.spinner$.next('start');
    }
  }

  requestEnd(){
    // --this.count;
    if(this.count === 0 || --this.count === 0){
     this.spinner$.next('stop');
     console.log(this.count)
    }
  }
  resetSpinner(){
    this.count =0;
    this.spinner$.next('stop');
  }
}
