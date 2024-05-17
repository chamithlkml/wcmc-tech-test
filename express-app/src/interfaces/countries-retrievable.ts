interface CountriesRetrievable{
  getCountries(prefix: string): Promise<string[]>;
}

export default CountriesRetrievable;