import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDataService } from '../../../services/customer-data.service';
import { Customer } from '../../../models/interfaces';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { InvoicesService } from '../../../services/invoices.service';

type side = {
    CompanyId: any,
    CompanyName: String
};

type InvoiceFixedData = {
    SuppliedBy: side,
    SuppliedTo: side
};

@Component({
    selector: 'app-create-new-invoice',
    templateUrl: './create-new-invoice.component.html',
    styleUrls: ['./create-new-invoice.component.css']
})
export class CreateNewInvoiceComponent implements OnInit {

    private Customer: Customer;
    public InvoiceFixedData: InvoiceFixedData;
    public NewInvoiceForm: FormGroup;

    constructor(
        private authService: AuthService,
        private route: ActivatedRoute,
        private customerDataService: CustomerDataService,
        private invoicesService: InvoicesService,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.queryParams
            .map(qryPrms => {
                if (qryPrms && qryPrms.customerId) {
                    return qryPrms.customerId;
                } else {
                    return Observable.throw("Customer id not found in qeury params")
                }
            })
            .catch(err => {
                return Observable.throw(err)
            })
            .subscribe(customerId => {
                this.initInvoiceFixedData(customerId)
                    .then(() => {
                        this.initForm();
                    })
            },
            err => {
                alert("Failed to fetch customer id - check console")
                console.log(err)
            }
            )
    }

    initInvoiceFixedData(customerId) {
        // use logged-in user details and customer details to set both sides in the invoice (supplier & supplied)
        return this.customerDataService.getCurrentlyViewedCustomer(customerId)
            .then((customer: Customer) => {
                this.Customer = customer
                this.InvoiceFixedData = {
                    SuppliedBy: {
                        CompanyId: this.authService.AppLoginStatus.loggedInUser._id,
                        CompanyName: this.authService.AppLoginStatus.loggedInUser.CompanyName
                    },
                    SuppliedTo: {
                        CompanyId: this.Customer._id,
                        CompanyName: this.Customer.CompanyName
                    }
                }
            })
    }

    initForm() {
        this.NewInvoiceForm = new FormGroup({
            SuppliedBy: new FormControl(this.InvoiceFixedData.SuppliedBy, [Validators.required]),
            SuppliedTo: new FormControl(this.InvoiceFixedData.SuppliedTo, [Validators.required]),
            ServiceGiven: new FormControl('', [Validators.required]),
            Discount: new FormControl('', []),
            Price: new FormControl('', [Validators.required]),
            PaymentType: new FormControl('', []),
        });
    }

    onSubmit() {
        if (this.NewInvoiceForm.valid) {
            let newInvoiceData = {}
            Object.keys(this.NewInvoiceForm.controls).forEach(key => {
                newInvoiceData[key] = this.NewInvoiceForm.get(key).value;
            });
            this.invoicesService.SendNewInvoiceToCustomer(newInvoiceData)
                .subscribe(
                    (res: any) => {
                        console.log(res);
                        //upon successful invoice creation navigate back to customer summary page
                        this.router.navigate(['Customers/ViewThisCustomer'], { queryParams: { 'customerId': this.Customer._id } })
                    },

                    err => { console.log(err) },
                    
                    () => { console.log('registration complete') }
                )
        } else {
            alert('Invalid Form');
        }
    }
}