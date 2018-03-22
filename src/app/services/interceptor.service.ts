import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class InterceptorService implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        public router: Router
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any {
        if (this.interceptionIsNeeded(req.url)) {
            req = req.clone({
                setHeaders: {
                    authorization: this.authService.AppLoginStatus.jwtToken
                }
            })
        }

        return next.handle(req)
            .map((returned: any) => {
                // console.log("Incoming server response intercepted:");
                return returned;
            })
            .catch((err: HttpErrorResponse): Observable<any> => {
                if (err.status == 401) {
                    this.router.navigate(['/Login']);
                    let errMsg = err.message + ' : ' + err.error
                    return Observable.throw(errMsg);
                }
                else {
                    return Observable.throw(err);
                }
            })
    }

    // this func will determine if to intercept the request, based on the req's url
    interceptionIsNeeded(url: string) {

        let publicUrls = [
            environment.LoginUrl,
            environment.RegisterUrl,
            `${environment.RegisterUrl}/validateFieldValue`,
            environment.VerifyLoginUrl,
            environment.BaseUrl,
            environment.BaseServerUrl,
            environment.RestCountriesUrl,
            `${environment.BaseUrl}/assets/default-company-icon.png`
        ]

        if (!publicUrls.includes(url) && !url.includes("https://s3.eu-central-1.amazonaws.com") && !url.includes("https://restcountries.eu")) {
            // if req.url is none of the above public url's - intercept
            return true
        } else {
            // if url is a public url - do not intercept
            return false
        }
    }
}
