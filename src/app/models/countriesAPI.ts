import { CountriesWithCities } from "./countriesWithCities"

export interface CountriesAPI {
    error: boolean;
    msg: string;
    data: CountriesWithCities[];
}