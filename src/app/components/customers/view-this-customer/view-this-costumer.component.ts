import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer, Invoice } from '../../../models/interfaces';
import { CustomerDataService } from '../../../services/customer-data.service';
import { CountriesService } from '../../../services/countries.service';
import { InvoicesService } from '../../../services/invoices.service';

@Component({
    selector: 'app-view-this-costumer',
    templateUrl: './view-this-costumer.component.html',
    styleUrls: ['./view-this-costumer.component.css']
})
export class ViewThisCostumerComponent implements OnInit {

    public Customer: Customer
    public ShowingInvoice: Invoice | boolean = false;

    constructor(
        private route: ActivatedRoute,
        private customerDataService: CustomerDataService,
        private invoicesService: InvoicesService,
        private Router: Router,
        private countriesService: CountriesService
    ) { }

    ngOnInit() {

        this.route.queryParams.subscribe(qryPrms => {
            if (qryPrms && qryPrms.customerId) {
                let customerId = qryPrms.customerId;
                this.customerDataService.getCurrentlyViewedCustomer(customerId)
                    .then((customer: Customer) => {
                        this.Customer = customer
                        this.getCountryFlag();
                    })
            } else {
                alert("no customer id found in query params - check 'ngOnInit' method")
            }
        });
    }

    showInvoice(invoiceId) {
        // this method can accept the whole invoice object instead of id! - but due to unforseen
        // changes in the object (that might cause inconsistent data) I will fetch the object from the invoice array
        for (var i = 0; i < this.Customer.Invoices.length; i++) {
            let thisInvoice = this.Customer.Invoices[i];
            if (thisInvoice._id == invoiceId) {
                this.ShowingInvoice = thisInvoice;
                return;
            }
        }
        alert("selected invoice data not found - check 'showInvoice' method ")
    }

    hideInvoice() {
        this.ShowingInvoice = false;
    }

    redeemInvoice(invoice: Invoice) {
        this.invoicesService.updateInvoice(invoice)
            .subscribe(
            res => { console.log(res) },

            err => { console.log(err) },

            () => { console.log('redeemInvoice method finished') }
            )
    }

    navigateToInvoiceCreation() {
        this.Router.navigate(['Customers/CreateNewInvoice'], { queryParams: { 'customerId': this.Customer._id } });
    }

    getCountryFlag() {
        let thisCountryName = this.Customer.Country;
        this.countriesService.getAllCountries().subscribe(
            countries => {
                for (let i = 0; i < countries.length; i++) {
                    if (countries[i].name == thisCountryName) {
                        this.Customer.CountryFlag = countries[i].flag;
                    }
                }
            },
            err => {
                console.log(err)
            },
            () => {
                console.log('fetched customer country flag')
            }
        )
    }
}