import { countryList } from '../consts/country-list';

export type CountryCode = (typeof countryList)[number]['alpha2'];
