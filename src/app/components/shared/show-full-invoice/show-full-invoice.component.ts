import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Invoice } from '../../../models/interfaces';

@Component({
    selector: 'app-show-full-invoice',
    templateUrl: './show-full-invoice.component.html',
    styleUrls: ['./show-full-invoice.component.css']
})
export class ShowFullInvoiceComponent implements OnInit {

    @Input()
    public Invoice: Invoice
    @Input()
    public ButtonText: String
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
