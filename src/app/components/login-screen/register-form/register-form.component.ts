import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyData } from '../../../models/interfaces';
import { environment } from '../../../../environments/environment';
import { RegistrationService } from '../../../services/registration.service';
import { CountriesService } from '../../../services/countries.service';
import { FormValidatorsService } from '../../../services/form-validators.service';
import { CountriesData } from '../../../models/custom_types';

@Component({
    selector: 'app-register-form',
    templateUrl: './register-form.component.html',
    styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

    @ViewChild('fileInput') public fileInput: ElementRef;
    @ViewChild('countryInput') public CountryInputField: ElementRef;
    public CountriesData: CountriesData = {
        CountryList: [],
        SuggestionList: []
    }
    public CompanyLogoPath: string = `${environment.BaseUrl}/assets/default-company-icon.png`
    public RegistrationForm: FormGroup;

    constructor(
        private Router: Router,
        private RegisterServ: RegistrationService,
        private CountriesService: CountriesService,
        private FormValidators: FormValidatorsService
    ) { }

    ngOnInit() {
        this.CountriesService.getAllCountries().subscribe(
            allcountries => {
                this.CountriesData.CountryList = allcountries;
            },
            err => {
                alert('failed to fetch countries')
                console.log(err);
            },
            () => {
                console.log("Countries fetched");
            }
        )
        this.initForm();
    }

    initForm() {
        this.RegistrationForm = new FormGroup({
            CompanyName: new FormControl('', [Validators.required], [this.asyncValidator.bind(this)]),
            CompanyNumber: new FormControl('', [Validators.required], [this.asyncValidator.bind(this)]),
            Username: new FormControl('', [Validators.required], [this.asyncValidator.bind(this)]),
            Password: new FormControl('', [this.FormValidators.passCheckForNums]),
            PassConfirm: new FormControl('', [Validators.required]),
            Address: new FormControl('', []),
            Country: new FormControl('', [Validators.required]),
            About: new FormControl('', []),
        },
            { validators: [this.FormValidators.chkPasswordMatch] }, // this will validate that pass and passConfirm match at all times
        );
    }

    asyncValidator(control: AbstractControl) {
        return this.FormValidators.checkValueOnServer(control)
    }

    openFileSelection() {
        this.fileInput.nativeElement.click()
    }

    onFileLoaded() {
        let reader = new FileReader();
        reader.onloadend = (file: any) => {
            this.CompanyLogoPath = file.target.result
        }
        reader.readAsDataURL(this.fileInput.nativeElement.files[0])
    }

    //autoSuggest countries
    autoSuggest() {
        let fieldValue = this.CountryInputField.nativeElement.value;
        if (fieldValue && fieldValue != '') {
            let countrylist = this.CountriesData.CountryList;
            this.CountriesData.SuggestionList = countrylist.filter((country) => {
                return (country.name.toLowerCase()).indexOf(fieldValue.toLowerCase()) === 0;
            })
        } else {
            this.CountriesData.SuggestionList = [];
        }
    }

    onCountrypicked(pickedCountry: string) {
        this.RegistrationForm.patchValue({ 'Country': pickedCountry })
        this.CountriesData.SuggestionList = [];
    }

    navigateToLoginForm(event?, username?) {
        if (event) event.preventDefault();
        if (!username) username = '';
        this.Router.navigate(['/Login/LoginForm'], { queryParams: { 'Username': username } });
    }

    onSubmit() {
        if (this.RegistrationForm.valid) {
            let companyData = new FormData()
            Object.keys(this.RegistrationForm.controls).forEach(key => {
                if (key != 'PassConfirm') {
                    companyData.append(key, this.RegistrationForm.get(key).value);
                }
            });
            companyData.append('CompanyLogo', this.fileInput.nativeElement.files[0])

            this.RegisterServ.registerNewCompany(companyData)
                .subscribe(
                (res: any) => {
                    console.log(res);
                    if (res.successMsg) this.navigateToLoginForm(null, companyData.get('Username'))
                },
                err => { console.log(err) },
                () => { console.log('registration complete') }
                )
        } else {
            alert('Invalid Form');
        }
    }
}