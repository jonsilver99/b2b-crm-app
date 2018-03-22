import { Component, OnInit } from '@angular/core';
import { InvoicesService } from '../../services/invoices.service';
import { Invoice } from '../../models/interfaces';

@Component({
    selector: 'app-invoices',
    templateUrl: './invoices.component.html',
    styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

    public MyInvoices: Array<Invoice>;
    public ShowingInvoice: Invoice | boolean = false;

    constructor(
        private invoicesService: InvoicesService

    ) { }

    ngOnInit() {
        this.invoicesService.getAllMyInvoices().subscribe(
            (invoices: Array<Invoice>) => {
                // console.log(invoices);
                this.MyInvoices = invoices;
            },
            err => {
                console.log(err);
            },
            () => {
                console.log('All My Invoices fetched')
            }
        )
    }

    payInvoice(invoice: Invoice) {
        invoice.Status = "Paid";
        this.invoicesService.updateInvoice(invoice).subscribe(
            res => {
                alert(res);
            },
            err => {
                console.log(err);
            },
            () => {
                console.log('payInvoice method finished')
            }
        )
    }

    showInvoice(invoice: Invoice) {
        this.ShowingInvoice = invoice;
    }

    hideInvoice() {
        this.ShowingInvoice = false;        
    }
}