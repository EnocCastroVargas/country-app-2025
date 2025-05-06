import { Component, inject } from '@angular/core';

import { CountryService } from '../../services/country.service';

import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';

@Component({
  selector: 'country-by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent {
  countryService = inject(CountryService);

  onSearch(query: string) {
    if (query =='') return;

    this.countryService.searchByCapital(query).subscribe((data) => {
      console.log(data);
    });
  }
}
