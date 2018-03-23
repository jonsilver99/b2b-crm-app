import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouterModule } from './app-router/app-router.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { ImgPathResolverDirective } from './directives/img-path-resolver.directive';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { LoginFormComponent } from './components/login-screen/login-form/login-form.component';
import { RegisterFormComponent } from './components/login-screen/register-form/register-form.component';

import { CustomersComponent } from './components/customers/customers.component';
import { ViewAllCustomersComponent } from './components/customers/view-all-customers/view-all-customers.component';
import { SelectCustomerToViewDirective } from './directives/select-customer-to-view.directive';
import { ViewThisCustomerComponent } from './components/customers/view-this-customer/view-this-customer.component';
import { CreateNewInvoiceComponent } from './components/customers/create-new-invoice/create-new-invoice.component';
import { ServiceProvidersComponent } from './components/service-providers/service-providers.component';
import { SelectCompanyToViewDirective } from './directives/select-company-to-view.directive';
import { ViewCompanyProfileComponent } from './components/shared/view-company-profile/view-company-profile.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { ViewFullInvoiceComponent } from './components/shared/view-full-invoice/view-full-invoice.component';

import { RegistrationService } from './services/registration.service';
import { CountriesService } from './services/countries.service';
import { AuthService } from './services/auth.service';
import { CustomerDataService } from './services/customer-data.service';
import { CompaniesDataService } from './services/companies-data.service';
import { InvoicesService } from './services/invoices.service';
import { RouteGuardService } from './services/route-guard.service';
import { InterceptorService } from './services/interceptor.service';
import { FormValidatorsService } from './services/form-validators.service';



@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        CustomersComponent,
        ViewAllCustomersComponent,
        ViewThisCustomerComponent,
        InvoicesComponent,
        LoginScreenComponent,
        LoginFormComponent,
        RegisterFormComponent,
        MyAccountComponent,
        SelectCustomerToViewDirective,
        ViewFullInvoiceComponent,
        CreateNewInvoiceComponent,
        ImgPathResolverDirective,
        ServiceProvidersComponent,
        ViewCompanyProfileComponent,
        SelectCompanyToViewDirective,
    ],
    imports: [
        ReactiveFormsModule,
        BrowserModule,
        AppRouterModule,
        RouterModule,
        HttpClientModule
    ],
    providers: [
        RegistrationService,
        AuthService,
        CustomerDataService,
        CompaniesDataService,
        InvoicesService,
        CountriesService,
        RouteGuardService,
        FormValidatorsService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
