import { NgModule, Component, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { LoginFormComponent } from '../components/login/login-form/login-form.component';
import { RegisterFormComponent } from '../components/login/register-form/register-form.component';
import { MyAccountComponent } from '../components/my-account/my-account.component';
import { InvoicesComponent } from '../components/invoices/invoices.component';
import { ViewThisCostumerComponent } from '../components/customers/view-this-customer/view-this-costumer.component';
import { CustomersComponent } from '../components/customers/customers.component';
import { AllCustomersComponent } from '../components/customers/all-customers/all-customers.component';
import { CreateNewInvoiceComponent } from '../components/customers/create-new-invoice/create-new-invoice.component';
import { ServiceProvidersComponent } from '../components/service-providers/service-providers.component';
import { CompanyProfileCardComponent } from '../components/shared/company-profile-card/company-profile-card.component';
import { RouteGuardService } from '../services/route-guard.service';

const appRoutes: Routes = [
    {
        path: 'Login', component: LoginComponent, canActivate:[RouteGuardService], canActivateChild: [RouteGuardService], children: [
            { path: 'LoginForm', component: LoginFormComponent },
            { path: 'RegisterForm', component: RegisterFormComponent },
            { path: '', redirectTo: 'LoginForm', pathMatch: 'full' },
            { path: '**', redirectTo: 'LoginForm', pathMatch: 'full' }
        ]
    },
    { path: 'MyAccount', component: MyAccountComponent, canActivate:[RouteGuardService] },
    {
        path: 'Customers', component: CustomersComponent, canActivate:[RouteGuardService], canActivateChild: [RouteGuardService], children: [
            { path: 'AllCustomers', component: AllCustomersComponent },
            { path: 'ViewThisCustomer', component: ViewThisCostumerComponent },
            { path: 'CreateNewInvoice', component: CreateNewInvoiceComponent },
            { path: '', redirectTo: 'AllCustomers', pathMatch: 'full' },
            { path: '**', redirectTo: 'AllCustomers', pathMatch: 'full' }
        ]
    },
    { path: 'ServiceProviders', component: ServiceProvidersComponent, canActivate:[RouteGuardService] },
    { path: 'CompanyProfileCard', component: CompanyProfileCardComponent, canActivate:[RouteGuardService] },
    { path: 'Invoices', component: InvoicesComponent, canActivate:[RouteGuardService] },
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