import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Customer, Invoice, CompanyData } from '../models/interfaces';

@Injectable()
export class CompaniesDataService {

    public AllCompanies: Array<CompanyData | any> = [];
    public MyServiceProviders: Array<CompanyData | any> = [];

    constructor(private HttpReqs: HttpClient, private AuthService: AuthService) { }

    getCompanies(skipValue?: number): Promise<Array<CompanyData>> {
        if (!skipValue) skipValue = this.AllCompanies.length;
        let qParams = { 'loggedInUser': `${this.AuthService.AppLoginStatus.loggedInUser._id}`, 'skip': `${skipValue}` }
        return this.HttpReqs.get(environment.CompaniesUrl, { params: qParams })
            .toPromise()
            .then((companies: Array<CompanyData>) => {
                // console.log(companies);
                this.AllCompanies = [...this.AllCompanies, ...companies];
                return this.AllCompanies;
            })
            .catch(err => {
                throw err
            })
    }

    getMyServiceProviders(skipValue?: number): Promise<Array<CompanyData>> {
        if (!skipValue) skipValue = this.MyServiceProviders.length;
        let qParam = new HttpParams().set('skip', `${skipValue}`)
        let userId = this.AuthService.AppLoginStatus.loggedInUser._id
        return this.HttpReqs.get(`${environment.CompaniesUrl}/myServiceProviders/${userId}`, { params: qParam })
            .toPromise()
            .then((serviceProviders: Array<CompanyData>) => {
                this.MyServiceProviders = [...this.MyServiceProviders, ...serviceProviders];
                return this.MyServiceProviders
            })
            .catch(err => {
                throw err
            })
    }

    // become a new customer of one of the other companies in the system 
    becomeACustomerOf(companyId) {
        // the new customer will naturally be the user currently logged into the system      
        let newCustomerId = this.AuthService.AppLoginStatus.loggedInUser._id;
        if (companyId == newCustomerId) {
            return Observable.throw({
                type: 'companyId matches customerId',
                message: 'Cant become a customer of youre own company'
            }).map(err => { return err })
        } else {
            return this.HttpReqs.post(environment.CustomersUrl, { companyId: companyId, newCustomerId: newCustomerId })
                .map((result: { successMsg: string, updatedCompany: CompanyData }) => {
                    this.immutableUpdate(result.updatedCompany)
                    return this.fetchOneCompanyFromArray(result.updatedCompany._id)
                });
        }
    }

    immutableUpdate(updatedCompany: CompanyData) {
    /* Upon becoming a customer of one of the companies in the array, this function will make 
       an immutable update - overwrite entire existing data (state) with a new updated one */
        this.AllCompanies = this.AllCompanies.map((company) => {
            if (company._id == updatedCompany._id) {
                return updatedCompany;
            } else {
                return company;
            }
        })
        this.MyServiceProviders = [...this.MyServiceProviders, updatedCompany]
    }

    fetchOneCompanyFromArray(companyId) {
        let searchIn = (this.AllCompanies.length > 0) ? this.AllCompanies : this.MyServiceProviders
        for (let i = 0; i < searchIn.length; i++) {
            if (searchIn[i]._id == companyId) {
                return searchIn[i];
            }
        }
        return null;
    }

    assertNoDuplicates(array) {
        return array.filter((company, pos, arr) => {
            return arr.indexOf(company) == pos;
        });
    }
}