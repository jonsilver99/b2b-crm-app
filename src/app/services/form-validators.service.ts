import { Injectable } from '@angular/core';
import { Validators, FormControl, ValidatorFn, FormGroup, AbstractControl } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class FormValidatorsService {

    constructor(public httpReqs: HttpClient) { }

    passCheckForNums(control: AbstractControl): any {
        let nums = new RegExp(/\d/g);
        return (nums.test(control.value)) ? null : { 'validnums': 'Password must contain at least 1 digit' }
    }

    checkValueOnServer(control: AbstractControl): any {
        // company name, username and company number must be unique
        // this will check for potential duplicate field values while registering new company
        let fieldValue = control.value;
        let fieldname;
        let controls = control.parent.controls;
        for (let controlName in controls) {
            if (controls[controlName] == control) {
                fieldname = controlName;
                break;
            }
        }

        let params = { 'fieldName': `${fieldname}`, 'fieldValue': `${fieldValue}` }
        return this.httpReqs.get(`${environment.RegisterUrl}/validateFieldValue`, { params: params, responseType: 'text' })
            .toPromise()
            .then(response => {
                return (response == 'Unique') ? null : { 'uniqueValue': `${fieldname} Already Exists` }
            })
            .catch(err => {
                throw err;
            })
    }

    chkPasswordMatch(form: FormGroup): any {
        if (form.get('Password').value != form.get('PassConfirm').value) {
            form.get('PassConfirm').setErrors({ 'passwordMatchErr': 'Password fields dont match' })
        } else {
            return null
        }
    }
}
