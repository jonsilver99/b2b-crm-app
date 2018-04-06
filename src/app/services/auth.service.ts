import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { CompanyData, AppLoginStatus } from '../models/interfaces';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { ShowLoaderService } from './show-loader.service';

@Injectable()
export class AuthService {

    public AppLoginStatus: AppLoginStatus = { isLoggedIn: false, jwtToken: null, loggedInUser: null }
    public LoginStatusEmitter: Subject<AppLoginStatus> = new Subject<AppLoginStatus>();

    constructor(
        private HttpReqs: HttpClient,
        private Router: Router,
        private ShowLoaderService: ShowLoaderService
    ) { }

    loginRequest(userData: { Username: string, Password: string }) {
        if (this.AppLoginStatus.isLoggedIn) {
            return Observable.of("Already Logged-in - login request aborted");
        }
        else {
            this.ShowLoaderService.ShowLoader();
            return this.HttpReqs.post(environment.LoginUrl, { user: userData }, { reportProgress: true })
                .map((response: AppLoginStatus) => {
                    if (response.isLoggedIn) {
                        // Once login request has been authenticated - commence login!
                        this.commenceLogin(response);
                    } else {
                        return Observable.throw('login request returned a denial - check AuthService')
                    }
                })
                .catch((err: HttpErrorResponse): Observable<any> => {
                    return Observable.throw(err)
                });
        }
    }

    commenceLogin(loginStatus: AppLoginStatus) {
        this.AppLoginStatus = loginStatus;
        localStorage.setItem('CRM-App', JSON.stringify(this.AppLoginStatus));
        this.declareChangeInLoginStatus();
        this.Router.navigate(['/MyAccount']);
        return `Logged-in as company: '${this.AppLoginStatus.loggedInUser.CompanyName}`;
    }

    verifyLogin() {
        // whenever navigation between local routes occures - this func checks the validity of the auth token.
        // this re-assures that expired/invalid sessions will be terminated 
        const header = new HttpHeaders({ 'authorization': this.AppLoginStatus.jwtToken });
        return this.HttpReqs.get(environment.VerifyLoginUrl, { headers: header, responseType: 'text' })
    }

    declareChangeInLoginStatus() {
        // emit current Login Status. Any SUBSCRIBED components accross the app will react to changes accordingly  
        this.LoginStatusEmitter.next(this.AppLoginStatus);
    }

    logout() {
        this.AppLoginStatus = { isLoggedIn: false, jwtToken: null, loggedInUser: null };
        localStorage.removeItem('CRM-App');
        this.declareChangeInLoginStatus();
        this.Router.navigate(['/Login']);
        // refresh browser. this will reset all data services
        window.location.reload() 
    }

    checkIfPreviousSessionExists(): void {
        // Check if previous login session exists in local storage
        let previousSession: AppLoginStatus = JSON.parse(localStorage.getItem('CRM-App'));
        if (previousSession) {
            this.commenceLogin(previousSession);
        }
    }
}