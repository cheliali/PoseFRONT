import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { DBService } from '../servicios/database.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private router: Router, private dbService: DBService) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    const username = localStorage.getItem('username');
    if (username && username.length > 0 && next.routeConfig?.path !== 'login') {
      this.dbService.username = username;
      return true;
    } else if (next.routeConfig?.path == 'login' && !username) {
      return true;
    } else if (next.routeConfig?.path == 'login' && username) {
      this.router.navigateByUrl('inicio');
      return false;
    } else {
      this.router.navigateByUrl('login');
      return false;
    }
  }
}
