import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,public route:Router) { }
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    else {
      this.route.navigate(['/login']);
      return false;
    }
  }

}
