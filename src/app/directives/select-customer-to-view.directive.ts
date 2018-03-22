import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
    selector: '[appSelectCustomerToView]'
})
export class SelectCustomerToViewDirective {

    constructor(
        private elRef: ElementRef,
        private renderer: Renderer2,
        private router: Router
    ) { }

    // upon click - navigate to clicked customer  
    @HostListener('click')
    navigateToCustomer() {
        let customer_id = this.elRef.nativeElement.id;
        this.router.navigate(['Customers/ViewThisCustomer'], { queryParams: { 'customerId': customer_id } })
    }

    // hovering highlights
    @HostListener("mouseenter")
    onHover() {
        this.renderer.addClass(this.elRef.nativeElement, "highlighted");
    }

    @HostListener("mouseleave")
    unHover() {
        this.renderer.removeClass(this.elRef.nativeElement, "highlighted");
    }



}
