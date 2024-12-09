import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  userProfile: any;

  constructor(private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(route)
    const payload: any = JSON.parse(sessionStorage.getItem('payload'));
    if (!!route.data['role']) {

      const routeRoles = route.data['role'];
      console.log(routeRoles)
      console.log(payload.name)
      if (!!payload['role']) {
        const userRoles = payload['role'];
        if (userRoles.includes(routeRoles)) {
          // user's roles contains route's role
          return true;
        } else {
          // toaster-display role user needs to have to access this route;
          return false;
        }
      }
    }
    return false;
  }

}
