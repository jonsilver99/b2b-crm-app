import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { ClientNotifications } from '../models/client_notifications';
import { ShowLoaderService } from './show-loader.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {

    constructor(
        private AuthService: AuthService,
        private Router: Router,
        private ShowLoaderService: ShowLoaderService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any {
        if (this.interceptionIsNeeded(req.url)) {
            req = req.clone({
                setHeaders: {
                    authorization: this.AuthService.AppLoginStatus.jwtToken
                }
            })
        }

        return next.handle(req)
            .map((response: any) => {
                this.reportRequestProgress(response);
                ClientNotifications.NotifySuccess(response);
                return response;
            })
            .catch((err: HttpErrorResponse): Observable<any> => {
                this.reportRequestProgress({ type: 4 });
                ClientNotifications.NotifyError(err);
                if (err.status == 401) {
                    this.Router.navigate(['/Login']);
                }
                return Observable.throw(err);
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

    reportRequestProgress(response) {
        if (response.type > 0 && response.type < 4) {
            // if http request in progress
            this.ShowLoaderService.ShowLoader();
        }
        if (response.type >= 4) {
            // if http request finished
            this.ShowLoaderService.HideLoader();
        }
    }
}