import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Directive({
    selector: '[appImgPathResolver]',
    host: {
        '(error)': 'onError()'
    }
})
export class ImgPathResolverDirective implements AfterViewInit {

    constructor(
        private elRef: ElementRef,
    ) { }

    onError() {
        this.elRef.nativeElement.src = `${environment.BaseUrl}/assets/default-company-icon.png`
    }

    ngAfterViewInit() {
        if (this.elRef.nativeElement.src == this.elRef.nativeElement.baseURI) {
            this.elRef.nativeElement.src = `${environment.BaseUrl}/assets/default-company-icon.png`
        }
    }
}
