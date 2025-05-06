import { Component, inject, signal } from '@angular/core';

import { CountryService } from '../../services/country.service';

import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { RESTCountry } from '../../interfaces/rest-countries.interface';

@Component({
  selector: 'country-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);

  isLoading = signal(false);
  isError = signal<string | null>(null);
  countries = signal<RESTCountry[]>([]);

  onSearch(query: string) {
    if (query == '') return;

    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByCapital(query).subscribe((countries) => {
      this.isLoading.set(false);
      this.countries.set(countries);

      console.log(countries);
    });
  }
}
