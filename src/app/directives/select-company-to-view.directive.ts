import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
    selector: '[appSelectCompanyToView]'
})
export class SelectCompanyToViewDirective {

    constructor(
        private elRef: ElementRef,
        private renderer: Renderer2,
        private router: Router
    ) { }

    // upon click - navigate to clicked customer  
    @HostListener('click')
    navigateToCustomer() {
        let company_id = this.elRef.nativeElement.id;
        let isServiceProvider = this.elRef.nativeElement.dataset.isprovider || false;
        this.router.navigate(['CompanyProfileCard'], { queryParams: { 'companyId': company_id, 'isProvider': isServiceProvider } })
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
