import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, catchError, throwError, delay } from 'rxjs';

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
      delay(2000),
      catchError((error) => {
        console.log('Error fecthing ', error);

        return throwError(
          () => new Error(`No se pudo obtener países con ese query ${query}`)
        );
      })
    );
  }

  searchCountryByAlphaCode(code: string) {
    const url = `${API_URL}/alpha/${code}`

    return this._http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      map(countries => countries.at(0)),
      catchError((error) => {
        console.log('Error fecthing ', error);

        return throwError(
          () => new Error(`No se pudo obtener la información del país con el código ${code}`)
        );
      })
    );
  }
}
