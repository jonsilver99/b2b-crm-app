import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { CompanyData } from '../models/interfaces';
import { AuthService } from './auth.service';

@Injectable()
export class RegistrationService {

    constructor(private httpReqs: HttpClient, public authService: AuthService) { }

    registerNewCompany(company: CompanyData | any) {
        if (this.authService.AppLoginStatus.isLoggedIn) {
            return Observable.of("Already Logged-in - registration request aborted");
        } else {
            return this.httpReqs.post(environment.RegisterUrl, company, { responseType: 'json' })
                .map((res: any) => {
                    return res;
                })
                .catch((err: HttpErrorResponse) => {
                    return Observable.throw(err);
                })
        }
    }
}