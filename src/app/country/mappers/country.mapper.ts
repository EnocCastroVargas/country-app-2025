import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-countries.interface';

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      capital: restCountry.capital.join(', '),
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.name.common,
      population: restCountry.population,
    };
  }

  static mapRestCountryArrayToCountryArray(
    restCountries: RESTCountry[]
  ): Country[] {
    return restCountries.map(this.mapRestCountryToCountry);
  }
}
