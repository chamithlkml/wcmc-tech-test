import CountriesRetrievable from "../interfaces/countries-retrievable";
import DataHandleable from "../interfaces/data-handleable";

class CountryData implements CountriesRetrievable {
  dataHandler: DataHandleable

  // Dependency injection
  constructor(dataHandler: DataHandleable){
    this.dataHandler = dataHandler
  }

  async getCountries(): Promise<string[]> {
    const countries = await this.dataHandler.getCountries();
    // Removing duplicates
    let uniqueCountries = [...new Set(countries)];
    // Sorted
    uniqueCountries.sort();
    
    return uniqueCountries;
  }
}

export default CountryData;