import { Directive, ElementRef, EventEmitter, Output, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Directive({
    selector: '[appLazyLoadOnScroll]',
})
export class LazyLoadOnScrollDirective implements OnInit {


    @Output()
    public DivBottomReached: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>()
    public ScrollEvents: Observable<any> = Observable.fromEvent(this.elRef.nativeElement, "scroll")

    constructor(
        private elRef: ElementRef,
    ) { }

    ngOnInit() {
        this.onScrollBottomReached();
    }

    onScrollBottomReached() {
        return this.ScrollEvents
            .map((event) => {
                // console.log(`Content Scroll height: ${this.elRef.nativeElement.scrollHeight}`)
                // console.log(`Div height: ${this.elRef.nativeElement.clientHeight}`)
                // console.log(`Scroll position from top : ${this.elRef.nativeElement.scrollTop}`)
                return this.elRef.nativeElement.scrollTop;
            })
            .filter((scrollTopValue) => {
                return Math.ceil(scrollTopValue) >= this.elRef.nativeElement.scrollHeight - this.elRef.nativeElement.clientHeight
            })
            .debounceTime(50)
            .subscribe(
            (scrollTopValue) => {
                this.elRef.nativeElement.scrollTop = scrollTopValue;
                this.DivBottomReached.emit(this.elRef.nativeElement);
            },
            (err) => {
                console.log(err);
            }
            )
    }
}