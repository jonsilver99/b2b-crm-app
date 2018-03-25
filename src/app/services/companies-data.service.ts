import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Customer, Invoice, CompanyData } from '../models/interfaces';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CompaniesDataService {

    public AllCompanies: Array<CompanyData | any>;

    constructor(private HttpReqs: HttpClient, private AuthService: AuthService) { }

    getAllCompanies() {
        // new HttpParams will use query-params instead of url param
        let param = new HttpParams().set('loggedInUser', `${this.AuthService.AppLoginStatus.loggedInUser._id}`)

        return this.HttpReqs.get(environment.CompaniesUrl, { params: param })
            .map((companies: Array<CompanyData>) => {
                // console.log(companies);
                this.AllCompanies = companies;
                return this.AllCompanies;
            })
            .catch(err => {
                return Observable.throw(err)
            })
    }

    fetchOneCompanyFromArray(companyId) {
        for (let i = 0; i < this.AllCompanies.length; i++) {
            if (this.AllCompanies[i]._id == companyId) {
                return this.AllCompanies[i];
            }
        }
        return null;
    }
}