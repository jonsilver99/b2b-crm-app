import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Customer, Invoice } from '../models/interfaces';

@Injectable()
export class CustomerDataService {

    public MyCustomers: Array<Customer> = [];

    constructor(private httpReqs: HttpClient, private authService: AuthService) { }

    getMyCustomers(skipValue?: number) {
        if (!skipValue) skipValue = this.MyCustomers.length;
        let qParam = { 'skip': `${skipValue}` }
        return this.httpReqs.get(`${environment.AllMyCustomersUrl}/${this.authService.AppLoginStatus.loggedInUser._id}`, { params: qParam })
            .toPromise()
            .then((customers: { _id: string, Customers: Array<Customer> }) => {
                debugger;
                this.MyCustomers = [...this.MyCustomers, ...customers.Customers];
                return this.MyCustomers;
            })
            .catch(err => {
                throw err
            })
    }

    getCurrentlyViewedCustomer(CustomerId) {
        let userId = this.authService.AppLoginStatus.loggedInUser._id;
        return this.httpReqs.get(`${environment.OneOfMyCustomersUrl}/${userId}/${CustomerId}`).toPromise()
            .catch(err => {
                throw (err)
            })
    }
}