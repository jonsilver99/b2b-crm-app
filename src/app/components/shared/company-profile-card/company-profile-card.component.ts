import { Component, OnInit, Input } from '@angular/core';
import { CompanyData } from '../../../models/interfaces';
import { environment } from '../../../../environments/environment';
import { CompaniesDataService } from '../../../services/companies-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../services/auth.service';
import { CustomerDataService } from '../../../services/customer-data.service';
import { CountriesService } from '../../../services/countries.service';

@Component({
    selector: 'app-company-profile-card',
    templateUrl: './company-profile-card.component.html',
    styleUrls: ['./company-profile-card.component.css']
})
export class CompanyProfileCardComponent implements OnInit {

    @Input()
    public CompanyData: CompanyData;
    public CountryFlag: string;
    public isMyCompany: boolean
    public isMyServiceProvider: boolean;

    constructor(
        private companyDataService: CompaniesDataService,
        private customerDataService: CustomerDataService,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private countriesService: CountriesService
    ) { }

    ngOnInit() {
        if (!this.CompanyData) {
            this.route.queryParams
                .map(qryPrms => {
                    if (qryPrms && qryPrms.companyId) {
                        let initData = {
                            companyId: qryPrms.companyId,
                            isProvider: qryPrms.isProvider
                        }
                        return initData;
                    } else {
                        return Observable.throw("Company id not found in qeury params")
                    }
                })
                .catch(err => {
                    return Observable.throw(err)
                })
                .subscribe(initData => {
                    this.initCompanyData(initData)
                },
                err => {
                    alert("Failed to fetch Company id from query params- check console")
                    console.log(err)
                }
                )
        } else {
            this.isMyCompany = true;
            console.log('this is my company');
        }
        this.getCountryFlag();
    }

    initCompanyData(initData) {
        if (initData.companyId == this.authService.AppLoginStatus.loggedInUser._id) {
            this.isMyCompany = true;
        }
        this.CompanyData = this.companyDataService.fetchOneCompanyFromArray(initData.companyId);
        this.isMyServiceProvider = (initData.isProvider == "true");
        console.log('my servie provider?', this.isMyServiceProvider);
        if (!this.CompanyData) {
            alert("Failed to fetch Company data from 'CompanyDataService' - service has probably not been initialized");
        }
    }

    becomeACustomer() {
        let companyId = this.CompanyData._id;
        this.customerDataService.becomeACustomerOf(companyId)
            .subscribe(
            response => {
                this.isMyServiceProvider = true;
            },
            err => {
                if (err.hasOwnProperty('type') && err.type == 'companyId matches customerId') {
                    alert(err.message);
                } else {
                    console.log(err);
                }
            },
            () => { console.log(`becomeACustomer method succeeded`) }
            )
    }

    getCountryFlag() {
        let thisCountryName = this.CompanyData.Country;
        this.countriesService.getAllCountries().subscribe(
            countries => {
                for (let i = 0; i < countries.length; i++) {
                    if (countries[i].name == thisCountryName) {
                        // this.CountryFlag = countries[i].flag;
                        this.CompanyData.CountryFlag = countries[i].flag;
                    }
                }
            },
            err => {
                console.log(err)
            },
            () => {
                console.log('fetched company country flag')
            }
        )
    }
}