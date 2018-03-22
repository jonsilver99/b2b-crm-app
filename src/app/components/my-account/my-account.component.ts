import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

    public UserDetails: {
        _id: String;
        CompanyName: String;
        CompanyNumber: Number;
        Country: String;
        Address?: String;
        About?: String;
        LogoURL?: String;
    }

    constructor(public authService: AuthService) { }

    ngOnInit() {
        this.UserDetails = this.authService.AppLoginStatus.loggedInUser;
    }
}