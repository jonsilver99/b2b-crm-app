import { Component, OnInit } from '@angular/core';
import { AppLoginStatus } from './models/interfaces';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public LoginStatus: AppLoginStatus;

    constructor(public authService: AuthService) {
        this.LoginStatus = this.authService.AppLoginStatus;
    }

    ngOnInit() {
        this.listenToLoginStatusChange();
        this.authService.checkIfPreviousSessionExists();
    }

    listenToLoginStatusChange() {
        this.authService.LoginStatusEmitter.subscribe(
            (changedStatus: AppLoginStatus) => {
                this.LoginStatus = changedStatus;
                console.log('new Login status:', this.LoginStatus)
            },
            
            (err) => { alert(err) },

            () => { alert('stopped listening to login status changes') }
        )
    }
}