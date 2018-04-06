import { Component, OnInit } from '@angular/core';
import { AppLoginStatus } from './models/interfaces';
import { AuthService } from './services/auth.service';
import { ShowLoaderService } from './services/show-loader.service';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public LoginStatus: AppLoginStatus;
    public ShowLoadingSpinner: boolean = false;

    constructor(
        public AuthService: AuthService,
        public ShowLoaderService: ShowLoaderService
    ) {
        this.LoginStatus = this.AuthService.AppLoginStatus;
    }

    ngOnInit() {
        this.listenToHttpRequests()
        this.listenToLoginStatusChange();
        this.AuthService.checkIfPreviousSessionExists();
    }

    listenToLoginStatusChange() {
        this.AuthService.LoginStatusEmitter.subscribe(
            (changedStatus: AppLoginStatus) => {
                this.LoginStatus = changedStatus;
                console.log('new Login status:', this.LoginStatus)
            },

            (err) => { alert(err) },

            () => { alert('stopped listening to login status changes') }
        )
    }

    listenToHttpRequests() {
        this.ShowLoaderService.IsRequestPending.subscribe(
            (IsRequestPending) => {
                this.ShowLoadingSpinner = IsRequestPending;
            },

            (err) => { alert(err) },

            () => { alert('stopped listening to login status changes') }
        )
    }
}