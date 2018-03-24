import { NgModule, Component, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '../components/about/about.component';
import { LoginScreenComponent } from '../components/login-screen/login-screen.component';
import { LoginFormComponent } from '../components/login-screen/login-form/login-form.component';
import { RegisterFormComponent } from '../components/login-screen/register-form/register-form.component';
import { MyAccountComponent } from '../components/my-account/my-account.component';
import { InvoicesComponent } from '../components/invoices/invoices.component';
import { ViewThisCustomerComponent } from '../components/customers/view-this-customer/view-this-customer.component';
import { CustomersComponent } from '../components/customers/customers.component';
import { ViewAllCustomersComponent } from '../components/customers/view-all-customers/view-all-customers.component';
import { CreateNewInvoiceComponent } from '../components/customers/create-new-invoice/create-new-invoice.component';
import { ServiceProvidersComponent } from '../components/service-providers/service-providers.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ViewCompanyProfileComponent } from '../components/shared/view-company-profile/view-company-profile.component';

const appRoutes: Routes = [
    { path: 'About', component: AboutComponent },
    {
        path: 'Login', component: LoginScreenComponent, canActivate: [RouteGuardService], canActivateChild: [RouteGuardService], children: [
            { path: 'LoginForm', component: LoginFormComponent },
            { path: 'RegisterForm', component: RegisterFormComponent },
            { path: '', redirectTo: 'LoginForm', pathMatch: 'full' },
            { path: '**', redirectTo: 'LoginForm', pathMatch: 'full' }
        ]
    },
    { path: 'MyAccount', component: MyAccountComponent, canActivate: [RouteGuardService] },
    {
        path: 'Customers', component: CustomersComponent, canActivate: [RouteGuardService], canActivateChild: [RouteGuardService], children: [
            { path: 'ViewAllCustomers', component: ViewAllCustomersComponent },
            { path: 'ViewThisCustomer', component: ViewThisCustomerComponent },
            { path: 'CreateNewInvoice', component: CreateNewInvoiceComponent },
            { path: '', redirectTo: 'ViewAllCustomers', pathMatch: 'full' },
            { path: '**', redirectTo: 'ViewAllCustomers', pathMatch: 'full' }
        ]
    },
    { path: 'ServiceProviders', component: ServiceProvidersComponent, canActivate: [RouteGuardService] },
    { path: 'ViewCompanyProfile', component: ViewCompanyProfileComponent, canActivate: [RouteGuardService] },
    { path: 'Invoices', component: InvoicesComponent, canActivate: [RouteGuardService] },
    { path: '', redirectTo: 'Login', pathMatch: 'full' },
    { path: '**', redirectTo: 'Login', pathMatch: 'full' }
];

const appRouter: ModuleWithProviders = RouterModule.forRoot(appRoutes);

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        appRouter
    ],
    declarations: []
})
export class AppRouterModule { }