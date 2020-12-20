import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private userService: UserService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean | UrlTree>(obs => {
      this.userService.current().subscribe(() => {
        obs.next(true);
      }, () => {
        obs.next(this.router.createUrlTree(['/sender/login']));
      });
    });
  }
}
