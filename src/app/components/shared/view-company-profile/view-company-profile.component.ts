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
    selector: 'app-view-company-profile',
    templateUrl: './view-company-profile.component.html',
    styleUrls: ['./view-company-profile.component.css']
})
export class ViewCompanyProfileComponent implements OnInit {

    @Input()
    public CompanyData: CompanyData;
    public CountryFlag: string;
    public IsMyCompany: boolean
    public IsMyServiceProvider: boolean;

    constructor(
        private CompanyDataService: CompaniesDataService,
        private CustomerDataService: CustomerDataService,
        private Route: ActivatedRoute,
        private Router: Router,
        private AuthService: AuthService,
        private CountriesService: CountriesService
    ) { }

    ngOnInit() {
        if (!this.CompanyData) {
            this.Route.queryParams
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
            this.IsMyCompany = true;
            console.log('this is my company');
        }
        this.getCountryFlag();
    }

    initCompanyData(initData) {
        if (initData.companyId == this.AuthService.AppLoginStatus.loggedInUser._id) {
            this.IsMyCompany = true;
        }
        this.CompanyData = this.CompanyDataService.fetchOneCompanyFromArray(initData.companyId);
        this.IsMyServiceProvider = (initData.isProvider == "true");
        console.log('my servie provider?', this.IsMyServiceProvider);
        if (!this.CompanyData) {
            alert("Failed to fetch Company data from 'CompanyDataService' - service has probably not been initialized");
        }
    }

    becomeACustomer() {
        let companyId = this.CompanyData._id;
        this.CustomerDataService.becomeACustomerOf(companyId)
            .subscribe(
            response => {
                this.IsMyServiceProvider = true;
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
        this.CountriesService.getAllCountries().subscribe(
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