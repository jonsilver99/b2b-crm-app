// This will hold the identification details of the User that's logged-in to the system. this will be stored as session data
export interface AppLoginStatus {
    isLoggedIn: boolean,
    jwtToken: string,
    loggedInUser: {
        _id: String,
        CompanyName: String,
        CompanyNumber: Number,
        Country: String,
        Address?: String,
        About?: String,
        LogoURL?: String
    }
}

// 
export interface CompanyData {
    _id?: String,
    CompanyName: String,
    CompanyNumber: Number,
    Username: String,
    Password: String,
    Country: String,
    CountryFlag?: String,    
    Address?: String,
    About?: String
    LogoURL?: String,
    Customers?: Array<any>
}

export interface Customer {
    _id?: String,
    CompanyName: String,
    CompanyNumber: Number,
    Country: String,
    CountryFlag?: String,
    Address?: String,
    About?: String
    LogoURL?: String,
    Invoices: Array<Invoice>
}

export interface Invoice {
    _id?: String,
    SuppliedBy: {
        CompanyId: any,
        CompanyName: String
    },
    SuppliedTo: {
        CompanyId: any,
        CompanyName: String
    },
    ServiceGiven: String,
    Date: Date | string,
    Discount: Number,
    Price: Number,
    PaymentType: String,
    Status?: "Paid" | "Not-paid";
}


export type Country = {
    flag: String,
    name: String
}