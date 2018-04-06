import { Component, OnInit, AfterContentInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-loading-spinner',
    templateUrl: './loading-spinner.component.html',
    styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit, AfterContentInit {

    public FullScreen: boolean = true;
    public BaseUrl: string = environment.BaseUrl;

    constructor() { }


    ngAfterContentInit() {
        // this.FullScreen = false;
    }

    ngOnInit() {
    }

    setSpinnerClasses() {
        if (this.FullScreen) {
            return 'fullscreen'
        } else {
            return 'small'
        }
    }

}
