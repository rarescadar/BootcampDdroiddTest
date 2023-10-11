import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountriesAPI } from '../../app/models/countriesAPI'

@Injectable({
  providedIn: 'root'
})
export class PopulationService {
  private apiUrl = 'https://countriesnow.space/api/v0.1/countries';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<CountriesAPI> {
    return this.http.get<CountriesAPI>(this.apiUrl);
  }
}
