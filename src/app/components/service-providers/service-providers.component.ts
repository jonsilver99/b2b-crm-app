import { Component, OnInit } from '@angular/core';
import { CompanyData } from '../../models/interfaces';
import { CustomerDataService } from '../../services/customer-data.service';
import { CompaniesDataService } from '../../services/companies-data.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-service-providers',
    templateUrl: './service-providers.component.html',
    styleUrls: ['./service-providers.component.css']
})
export class ServiceProvidersComponent implements OnInit {
    
    // Switch data views
    public ShowServiceProviders: Boolean = true;
    public ShowAllCompanies: Boolean = false;
    
    // Companies data
    public AllCompanies: Array<CompanyData> = [];
    public ShowingCompanies: Array<CompanyData> = [];

    constructor(
        private CompaniesDataService: CompaniesDataService,
        private AuthService: AuthService
    ) { }

    ngOnInit() {
        this.CompaniesDataService.getAllCompanies()
            .subscribe(
            allCompanies => {
                this.AllCompanies = allCompanies;
                this.appendShowingCompaniesArr();
            },
            err => {
                console.log(err);
            },
            () => {
                console.log('All companies fetched');
            }
            )
    }

    toggleMyServiceProviders() {
        // Setup booleans
        this.ShowAllCompanies = false;
        this.ShowServiceProviders = true;
        // Reset ShowingCompanies Array
        this.ShowingCompanies = []
        this.appendShowingCompaniesArr();
    }

    toggleAllCompanies() {
        // Setup booleans
        this.ShowAllCompanies = true;
        this.ShowServiceProviders = false;
        // Reset ShowingCompanies Array
        this.ShowingCompanies = [];
        this.appendShowingCompaniesArr();
    }

    loadMoreData(scrolledDiv:HTMLElement) {
        console.log('Bottom of div reached:', scrolledDiv);
        setTimeout(() => {
            this.appendShowingCompaniesArr();
        }, 200)
    }

    appendShowingCompaniesArr() {

        if (this.ShowAllCompanies) {

            let currentArrLength = this.ShowingCompanies.length

            for (let i = currentArrLength; i < currentArrLength + 15; i++) {
                if (i == this.AllCompanies.length) {
                    break;
                }
                this.ShowingCompanies.push(this.AllCompanies[i]);
            }
        }

        else if (this.ShowServiceProviders) {

            let appendCount = 0 //max 15;
            let userId = this.AuthService.AppLoginStatus.loggedInUser._id;

            for (let i = 0; i < this.AllCompanies.length; i++) {
                let company = this.AllCompanies[i];
                if (appendCount >= 15) {
                    break;
                }
                if (company.Customers.includes(userId) && !this.ShowingCompanies.includes(company)) {
                    this.ShowingCompanies.push(company);
                    appendCount++;
                }
            }
        }
    }
}