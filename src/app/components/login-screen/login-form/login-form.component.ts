import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

    public LoginForm: FormGroup;

    constructor(
        public Router: Router,
        public Route?: ActivatedRoute,
        public AuthService?: AuthService
    ) { }

    ngOnInit() {
        this.initForm();
        this.Route.queryParams.subscribe((quryPrms) => {
            if (quryPrms && quryPrms.Username) {
                this.LoginForm.patchValue({ 'Username': quryPrms.Username })
            }
        });
    }

    initForm() {
        this.LoginForm = new FormGroup({
            Username: new FormControl('', [Validators.required]),
            Password: new FormControl('', [Validators.required]),
        });
    }

    navigateToRegistrationForm(event) {
        event.preventDefault();
        this.Router.navigate(['/Login/RegisterForm']);
    }

    onSubmit() {
        if (this.LoginForm.valid) {
            let userData = {
                Username: this.LoginForm.get('Username').value,
                Password: this.LoginForm.get('Password').value
            }
            this.AuthService.loginRequest(userData)
                .subscribe(
                    (res) => { console.log(res) },

                    (err) => { console.log(err) },

                    () => { console.log("Login complete") }
                )
        } else {
            alert('Invalid Form');
        }
    }
}