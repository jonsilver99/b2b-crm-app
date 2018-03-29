import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../models/interfaces';
import { CustomerDataService } from '../../../services/customer-data.service';
import { environment } from '../../../../environments/environment';


@Component({
    selector: 'app-view-all-customers',
    templateUrl: './view-all-customers.component.html',
    styleUrls: ['./view-all-customers.component.css']
})
export class ViewAllCustomersComponent implements OnInit {

    public AllMyCustomers: Array<Customer> = [];
    public ShowingCustomers: Array<Customer> = [];

    constructor(private CustomerDataService: CustomerDataService) { }

    ngOnInit() {
        this.CustomerDataService.getAllMyCustomers()
            .subscribe(
            customers => {
                // console.log('My customers:', customers)
                this.AllMyCustomers = customers;
                this.appendShowingCustomersArr();
            },
            err => {
                console.log(err)
            },
            () => {
                console.log('customer data fetched')
            }
            )
    }

    loadMoreData(scrolledDiv:HTMLElement) {
        console.log('Bottom of div reached:', scrolledDiv);
        setTimeout(() => {
            this.appendShowingCustomersArr();
        }, 200)
    }

    appendShowingCustomersArr() {
        let currentArrLength = this.ShowingCustomers.length
        for (let i = currentArrLength; i < currentArrLength + 15; i++) {
            if (i == this.AllMyCustomers.length) {
                break;
            }
            if (!this.ShowingCustomers.includes(this.AllMyCustomers[i])) {
                this.ShowingCustomers.push(this.AllMyCustomers[i])
            }
        }
    }
}