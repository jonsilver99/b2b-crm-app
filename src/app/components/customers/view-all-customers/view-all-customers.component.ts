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

    public MyCustomers: Array<Customer> = [];

    constructor(private CustomerDataService: CustomerDataService) { }

    ngOnInit() {
        this.CustomerDataService.getAllMyCustomers()
            .subscribe(
            customers => {
                // console.log('My customers:', customers)
                this.MyCustomers = customers;
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