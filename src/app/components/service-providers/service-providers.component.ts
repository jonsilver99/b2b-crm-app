import { Component, OnInit } from '@angular/core';
import { CompanyData } from '../../models/interfaces';
import { CustomerDataService } from '../../services/customer-data.service';
import { CompaniesDataService } from '../../services/companies-data.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-service-providers',
    templateUrl: './service-providers.component.html',
    styleUrls: ['./service-providers.component.css']
})
export class ServiceProvidersComponent implements OnInit {

    // All companies
    public AllCompanies: Array<CompanyData>;
    public ShowAllCompanies: Boolean = false;

    // My service providers - companies I'm a customer of
    public MyServicProviders: Array<CompanyData>;
    public ShowMyServiceProviders: Boolean = true;

    constructor(
        private CompaniesDataService: CompaniesDataService,
        private AuthService: AuthService
    ) { }

    ngOnInit() {
        this.CompaniesDataService.getAllCompanies()
            .subscribe(
            allCompanies => {
                this.AllCompanies = allCompanies;
                this.MyServicProviders = this.sortMyServiceProviders()
            },
            err => {
                console.log(err);
            },
            () => {
                console.log('All companies fetched');
            }
            )
    }

    sortMyServiceProviders(): Array<any> {
        let myServiceProviders = this.AllCompanies.filter((company) => {
            return company.Customers.includes(this.AuthService.AppLoginStatus.loggedInUser._id);
        })
        return myServiceProviders;
    }

    toggleMyServiceProviders() {
        this.ShowAllCompanies = false;
        this.ShowMyServiceProviders = true;
    }
    
    toggleAllCompanies() {
        this.ShowAllCompanies = true;
        this.ShowMyServiceProviders = false;
    }
}