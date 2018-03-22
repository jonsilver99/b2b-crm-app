import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../models/interfaces';
import { CustomerDataService } from '../../../services/customer-data.service';
import { environment } from '../../../../environments/environment';


@Component({
    selector: 'app-all-customers',
    templateUrl: './all-customers.component.html',
    styleUrls: ['./all-customers.component.css']
  })
export class AllCustomersComponent implements OnInit {

    public myCustomers: Array<Customer> = [];

    constructor(private customerDataService: CustomerDataService) { }

    ngOnInit() {
        this.customerDataService.getAllMyCustomers()
            .subscribe(
            customers => {
                // console.log('My customers:', customers)
                this.myCustomers = customers;
            },
            err => {
                console.log(err)
            },
            () => {
                console.log('customer data fetched')
            }
            )
    }
}