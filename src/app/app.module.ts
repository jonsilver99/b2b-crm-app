import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouterModule } from './app-router/app-router.module';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MyAccountComponent } from './components/my-account/my-account.component';


import { LoginComponent } from './components/login/login.component';
import { LoginFormComponent } from './components/login/login-form/login-form.component';
import { RegisterFormComponent } from './components/login/register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegistrationService } from './services/registration.service';
import { AuthService } from './services/auth.service';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { CustomerDataService } from './services/customer-data.service';
import { SelectCustomerToViewDirective } from './directives/select-customer-to-view.directive';
import { CustomersComponent } from './components/customers/customers.component';
import { ViewThisCostumerComponent } from './components/customers/view-this-customer/view-this-costumer.component';
import { AllCustomersComponent } from './components/customers/all-customers/all-customers.component';
import { CreateNewInvoiceComponent } from './components/customers/create-new-invoice/create-new-invoice.component';
import { ImgPathResolverDirective } from './directives/img-path-resolver.directive';
import { ServiceProvidersComponent } from './components/service-providers/service-providers.component';
import { CompaniesDataService } from './services/companies-data.service';
import { CompanyProfileCardComponent } from './components/shared/company-profile-card/company-profile-card.component';
import { SelectCompanyToViewDirective } from './directives/select-company-to-view.directive';
import { InvoicesService } from './services/invoices.service';
import { CountriesService } from './services/countries.service';
import { RouteGuardService } from './services/route-guard.service';
import { InterceptorService } from './services/interceptor.service';
import { FormValidatorsService } from './services/form-validators.service';
import { ShowFullInvoiceComponent } from './components/shared/show-full-invoice/show-full-invoice.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        CustomersComponent,
        AllCustomersComponent,
        ViewThisCostumerComponent,
        InvoicesComponent,
        LoginComponent,
        LoginFormComponent,
        RegisterFormComponent,
        MyAccountComponent,
        SelectCustomerToViewDirective, ShowFullInvoiceComponent, CreateNewInvoiceComponent, ImgPathResolverDirective, ServiceProvidersComponent, CompanyProfileCardComponent, SelectCompanyToViewDirective,
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
