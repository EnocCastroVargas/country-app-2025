import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, throwError } from 'rxjs';

import { RESTCountry } from '../interfaces/rest-countries.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private _http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this._http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      catchError((error) => {
        console.log('Error fecthing ', error);

        return throwError(
          () => new Error(`No se pudo obtener capitales con ese query ${query}`)
        );
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    return this._http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      catchError((error) => {
        console.log('Error fecthing ', error);

        return throwError(
          () => new Error(`No se pudo obtener países con ese query ${query}`)
        );
      })
    );
  }
}
