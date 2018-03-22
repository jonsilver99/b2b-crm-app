import { Injectable } from '@angular/core';
import { Country } from '../models/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CountriesService {

    public Countries: Array<Country>

    constructor(public httpReqs: HttpClient) { }

    getAllCountries() {

        if (this.Countries && this.Countries.length > 0) {
            return Observable.of(this.Countries);
        }

        return this.httpReqs.get(environment.RestCountriesUrl)
            .map((allCountries: Array<Country>) => {
                this.Countries = allCountries;
                return this.Countries;
            })
            .catch(err => {
                return Observable.throw(err);
            })
    }
}