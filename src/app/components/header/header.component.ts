import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { AppLoginStatus } from '../../models/interfaces';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {

    @Input()
    public LoginStatus: AppLoginStatus;
    public MainIconPath:String = `${environment.BaseUrl}/assets/main-icon.png` 

    constructor(public authService: AuthService) { }

    ngOnInit() {
    }
    
    ngOnChanges(changes: SimpleChange | any) {
        this.LoginStatus = changes.LoginStatus.currentValue;
    }

    appLogout(event) {
        event.preventDefault();
        this.authService.logout();
    }

}
