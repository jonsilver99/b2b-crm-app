import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Invoice } from '../models/interfaces';

@Injectable()
export class InvoicesService {

    constructor(
        private httpReqs: HttpClient,
        private authService: AuthService
    ) { }

    getAllMyInvoices() {
        let userId = this.authService.AppLoginStatus.loggedInUser._id;
        return this.httpReqs.get(`${environment.InvoicesUrl}/${userId}`);
    }

    updateInvoice(invoice: Invoice) {
        return this.httpReqs.post(`${environment.InvoicesUrl}/${invoice._id}`, invoice)
            .map((response: { succesMsg: string, updatedInvoice: Invoice }) => {
                if (response.updatedInvoice.Status != "Paid") {
                    invoice.Status = "Not-paid";
                    return Observable.throw("Something went wrong, seems like invoice didnt redeem - check invoices-service");
                }
                return "Invoice paid!"
            })
            .catch((err: Observable<HttpErrorResponse>) => {
                // if invoice update/redeem failed - set its status on client back to "Not-paid"
                invoice.Status = "Not-paid";
                return Observable.throw(err);
            })
    }

    SendNewInvoiceToCustomer(newInvoiceData: Invoice | any) {
        return this.httpReqs.post(environment.InvoicesUrl, newInvoiceData, { responseType: 'json' })
            .map((response) => {
                return response;
            })
            .catch((err: Observable<HttpErrorResponse>) => {
                return Observable.throw(err);
            })
    }
}