/***********************************
    Custome types specified below:
***********************************/


/** Create new invoice component **/
// InvoiceFixedData: injects the invoice component with the two sides of the bargain  
export type InvoiceFixedData = {
    SuppliedBy: Side,
    SuppliedTo: Side
};
// Represents a company in the invoice (either the supplier or the customer)
export type Side = {
    CompanyId: any,
    CompanyName: String
};



/** Register form component **/
// CountryList holds all countries objects. SuggestionList dynamically holds auto-suggestions that match user input 
export type CountriesData = {
    countryList: Array<Country>,
    SuggestionList: Array<Country>
};

export type Country = {
    flag: String,
    name: String
};


