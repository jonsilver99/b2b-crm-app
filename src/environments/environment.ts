// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    BaseUrl: "http://localhost:4200",
    BaseServerUrl: "http://localhost:3005",
    RegisterUrl:"http://localhost:3005/register",
    LoginUrl:"http://localhost:3005/Login",
    VerifyLoginUrl:"http://localhost:3005/api",
    CustomersUrl:"http://localhost:3005/api/customers",
    AllMyCustomersUrl:"http://localhost:3005/api/customers/allmycustomers",
    OneOfMyCustomersUrl:"http://localhost:3005/api/customers/oneofmycustomers",
    InvoicesUrl:"http://localhost:3005/api/invoices",
    CompaniesUrl:"http://localhost:3005/api/companies",
    RestCountriesUrl:"https://restcountries.eu/rest/v2/all?fields=name;flag"
};
