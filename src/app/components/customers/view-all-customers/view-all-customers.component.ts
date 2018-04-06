import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { Customer } from '../../../models/interfaces';
import { CustomerDataService } from '../../../services/customer-data.service';
import { environment } from '../../../../environments/environment';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner.component';


@Component({
    selector: 'app-view-all-customers',
    templateUrl: './view-all-customers.component.html',
    styleUrls: ['./view-all-customers.component.css']
})
export class ViewAllCustomersComponent implements OnInit {

    public ShowingCustomers: Array<Customer> = [];

    // Data loading spinner...
    @ViewChild('LoadingSpinnerEntry', { read: ViewContainerRef })
    public LoadingSpinnerEntry: ViewContainerRef
    public LoadingSpinner: ComponentRef<LoadingSpinnerComponent>
    public LoadingInprogress: boolean = false

    constructor(
        private CustomerDataService: CustomerDataService,
        private ComponentResolver: ComponentFactoryResolver
    ) { }

    ngOnInit() {
        this.appendShowingCustomersArr();
    }

    loadMoreData(scrolledDiv: HTMLElement) {
        // load more data (only if loading is not already in progress)
        if (!this.LoadingInprogress) {
            console.log('Bottom of container-div reached');
            this.revealLoadingSpinner(scrolledDiv);
            this.LoadingInprogress = true;
            setTimeout(() => {
                this.appendShowingCustomersArr()
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

    appendShowingCustomersArr() {
        return this.CustomerDataService.getMyCustomers()
            .then(Customers => {
                this.ShowingCustomers = Customers;
                return 'data-fetch complete'
            })
    }
}