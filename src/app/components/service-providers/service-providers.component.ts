import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { CompanyData } from '../../models/interfaces';
import { CustomerDataService } from '../../services/customer-data.service';
import { CompaniesDataService } from '../../services/companies-data.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';

@Component({
    selector: 'app-service-providers',
    templateUrl: './service-providers.component.html',
    styleUrls: ['./service-providers.component.css']
})
export class ServiceProvidersComponent implements OnInit {

    // Switch data views
    public ShowServiceProviders: Boolean = true;
    public ShowAllCompanies: Boolean = false;

    // Companies displayed on dom
    public ShowingCompanies: Array<CompanyData> = [];

    // Data loading spinner...
    @ViewChild('LoadingSpinnerEntry', { read: ViewContainerRef })
    public LoadingSpinnerEntry: ViewContainerRef
    public LoadingSpinner: ComponentRef<LoadingSpinnerComponent>
    public LoadingInprogress: boolean = false

    constructor(
        private CompaniesDataService: CompaniesDataService,
        private AuthService: AuthService,
        private ComponentResolver: ComponentFactoryResolver
    ) { }

    ngOnInit() {
        this.appendShowingCompaniesArr()
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

    loadMoreData(scrolledDiv: HTMLElement) {
        // load more data (only if loading is not already in progress)
        if (!this.LoadingInprogress) {
            console.log('Bottom of container-div reached');
            this.revealLoadingSpinner(scrolledDiv);
            this.LoadingInprogress = true;
            setTimeout(() => {
                this.appendShowingCompaniesArr()
                    .then((result: string) => {
                        if (result == 'data-fetch complete') {
                            this.hideLoadingSpinner(scrolledDiv);
                            this.LoadingInprogress = false;
                        }
                    });
            }, 250)
        }
    }

    revealLoadingSpinner(scrolledDiv: HTMLElement) {
        const spinnerCreator = this.ComponentResolver.resolveComponentFactory(LoadingSpinnerComponent)
        this.LoadingSpinner = this.LoadingSpinnerEntry.createComponent(spinnerCreator);
        this.LoadingSpinner.instance.FullScreen = false
        setTimeout(() => {
            scrolledDiv.scrollTo(0, scrolledDiv.scrollHeight);
        }, 0)
    }

    hideLoadingSpinner(scrolledDiv: HTMLElement) {
        this.LoadingSpinner.destroy();
        scrolledDiv.scrollTo(0, scrolledDiv.scrollTop - 10);
    }

    appendShowingCompaniesArr() {
        if (this.ShowAllCompanies) {
            return this.CompaniesDataService.getCompanies()
                .then(companies => {
                    this.ShowingCompanies = companies;
                    return 'data-fetch complete'
                })
        }
        else if (this.ShowServiceProviders) {
            return this.CompaniesDataService.getMyServiceProviders()
                .then(serviceProviders => {
                    this.ShowingCompanies = serviceProviders;
                    return 'data-fetch complete'
                })
        }
    }
}