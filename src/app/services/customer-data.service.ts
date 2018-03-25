import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Customer, Invoice } from '../models/interfaces';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CustomerDataService {

    public MyCustomers: Array<Customer>;

    constructor(private httpReqs: HttpClient, private authService: AuthService) { }

    getAllMyCustomers() {
        return this.httpReqs.get(`${environment.AllMyCustomersUrl}/${this.authService.AppLoginStatus.loggedInUser._id}`)
            .map((data: { _id: string, Customers: Array<Customer> }) => {
                this.MyCustomers = data.Customers
                return this.MyCustomers;
            })
            .catch(err => {
                return Observable.throw(err)
            })
    }

    getCurrentlyViewedCustomer(CustomerId) {
        let userId = this.authService.AppLoginStatus.loggedInUser._id;
        return this.httpReqs.get(`${environment.OneOfMyCustomersUrl}/${userId}/${CustomerId}`).toPromise()
            .catch(err => {
                throw (err)
            })
    }

    // become a new customer of one of the other companies in the system 
    becomeACustomerOf(companyId) {
        // the new customer will naturally be the user currently logged into the system      
        let newCustomerId = this.authService.AppLoginStatus.loggedInUser._id;
        if (companyId == newCustomerId) {
            return Observable.throw({
                type: 'companyId matches customerId',
                message: 'Cant become a customer of youre own company'
            }).map(err => { return err })
        } else {
            return this.httpReqs.post(environment.CustomersUrl, { companyId: companyId, newCustomerId: newCustomerId }, { responseType: 'json' });
        }
    }
}