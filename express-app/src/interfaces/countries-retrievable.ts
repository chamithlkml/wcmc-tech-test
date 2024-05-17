interface CountriesRetrievable{
  getCountries(): Promise<string[]>;
}

export default CountriesRetrievable;