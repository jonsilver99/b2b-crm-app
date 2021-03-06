import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class RouteGuardService implements CanActivate, CanActivateChild {

    constructor(
        public authService: AuthService,
        public router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let requestedRoute = route.routeConfig.path;

        // if requested path is login, and user is already logged-in,  block the path and re-route to MyAccount 
        if (requestedRoute == 'Login' || requestedRoute == 'LoginForm' || requestedRoute == 'RegisterForm') {
            if (this.authService.AppLoginStatus.isLoggedIn) {
                console.log(requestedRoute, 'Route is blocked while logged-in');
                this.router.navigate(['/MyAccount']);
                return false;
            } else {
                return true;
            }

        } else {
            // if requested requires a login state - verify that the login/session is valid 
            if (this.authService.AppLoginStatus.isLoggedIn && this.authService.AppLoginStatus.jwtToken) {
                return this.authService.verifyLogin()
                    .map((verification) => {
                        if (verification == 'ok') {
                            return true
                        } else {
                            console.log('Auth token expired or not verified - logging out')
                            this.authService.logout();
                            return false;
                        }
                    }).first()
                    .catch((err: HttpErrorResponse): Observable<any> => {
                        return Observable.throw(err);
                    });
            } else {
                alert("Route Restricted - please log in first");
                console.log("Route Restricted - please log in first");
                this.router.navigate(['/Login']);
                return false;
            }
        }
    }


    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }
}