import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { CompanyData, AppLoginStatus } from '../models/interfaces';
import 'rxjs/Rx';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {

    public AppLoginStatus: AppLoginStatus = { isLoggedIn: false, jwtToken: null, loggedInUser: null }
    public LoginStatusEmitter: Subject<AppLoginStatus> = new Subject<AppLoginStatus>();

    constructor(
        public httpReqs: HttpClient,
        public router: Router,
    ) { }

    loginRequest(userData: { Username: string, Password: string }) {
        if (this.AppLoginStatus.isLoggedIn) {
            return Observable.of("Already Logged-in - login request aborted");
        }
        else {
            return this.httpReqs.post(environment.LoginUrl, { user: userData }, { responseType: 'json' })
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
        this.router.navigate(['/MyAccount']);
        return `Logged-in as company: '${this.AppLoginStatus.loggedInUser.CompanyName}`;
    }

    verifyLogin() {
        // whenever navigation between local routes occures - this func checks the validity of the auth token.
        // this re-assures that expired/invalid sessions will be terminated 
        const header = new HttpHeaders({ 'authorization': this.AppLoginStatus.jwtToken });
        return this.httpReqs.get(environment.VerifyLoginUrl, { headers: header, responseType: 'text' })
    }

    declareChangeInLoginStatus() {
        // emit the current Login Status. Any subscribed components accross the app will listen to changes 
        // and react accordingly  
        this.LoginStatusEmitter.next(this.AppLoginStatus);
    }

    logout() {
        this.AppLoginStatus = { isLoggedIn: false, jwtToken: null, loggedInUser: null };
        localStorage.removeItem('CRM-App');
        this.declareChangeInLoginStatus();
        this.router.navigate(['/Login']);
    }

    checkIfPreviousSessionExists(): void {
        // Check if previous login session exists in local storage
        let previousSession: AppLoginStatus = JSON.parse(localStorage.getItem('CRM-App'));
        if (previousSession) {
            this.commenceLogin(previousSession);
        }
    }
}