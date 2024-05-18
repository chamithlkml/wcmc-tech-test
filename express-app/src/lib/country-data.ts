import CountriesRetrievable from "../interfaces/countries-retrievable";
import DataHandleable from "../interfaces/data-handleable";

class CountryData implements CountriesRetrievable {
  private dataHandler: DataHandleable

  // Dependency injection
  constructor(dataHandler: DataHandleable){
    this.dataHandler = dataHandler
  }

  async getCountries(prefix: string): Promise<string[]> {
    return await this.dataHandler.getCountries(prefix);
  }
}

export default CountryData;