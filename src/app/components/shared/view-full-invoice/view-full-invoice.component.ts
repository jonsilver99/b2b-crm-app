import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Invoice } from '../../../models/interfaces';

@Component({
    selector: 'app-view-full-invoice',
    templateUrl: './view-full-invoice.component.html',
    styleUrls: ['./view-full-invoice.component.css']
})
export class ViewFullInvoiceComponent implements OnInit {

    @Input()
    public Invoice: Invoice
    @Output()
    public RedeemInvoice: EventEmitter<Invoice> = new EventEmitter<Invoice>();

    constructor() { }

    ngOnInit() {
    }

    redeem(event) {
        event.stopPropagation();
        if (this.Invoice.Status == "Paid") {
            alert('Invoice already redeemed');
            return;
        }
        this.Invoice.Status = "Paid";
        this.RedeemInvoice.emit(this.Invoice);
    }

}
