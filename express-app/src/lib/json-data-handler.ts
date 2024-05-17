import fs from 'node:fs/promises'
import { ErrorCode, HttpException } from "../exceptions/http-exception";
import { InternalException } from "../exceptions/internal-exception";
import DataHandleable from "../interfaces/data-handleable";
import CountryData from './country-data';
import { MetricData } from '../interfaces/metric-data';

class JsonDataHandler implements DataHandleable{
  private filePath: string;
  private static instance: JsonDataHandler;
  private countryMetrics: Array<MetricData> | null = null;

  private constructor(filePath: string){
    this.filePath = filePath
  }

  // Singleton pattern
  public static getInstance(filePath: string): JsonDataHandler {
    if(!JsonDataHandler.instance){
      JsonDataHandler.instance = new JsonDataHandler(filePath)
    }

    return JsonDataHandler.instance
  }

  private async loadDataFromFile(): Promise<void>{
    try {
      if(this.countryMetrics === null){
        this.countryMetrics = JSON.parse(await fs.readFile(this.filePath, { encoding: 'utf-8' }))
      }
    } catch (error) {
      throw new InternalException((error as Error).message, ErrorCode.INTERNAL_ERROR, 500)
    }
  }

  async getCountries(prefix: string): Promise<string[]> {
    await this.loadDataFromFile()

    let countryMetricsArr = this.countryMetrics;

    if(prefix !== ''){
      const prefixLowercase = prefix.toLowerCase();
      countryMetricsArr = this.countryMetrics?.filter((dataObj) => {
        let words = dataObj.country.split(' ');
        let matchingWords = words.filter((word) => {
          return word.toLowerCase().startsWith(prefixLowercase);
        });
        
        return matchingWords.length > 0;
      })!
    }

    return countryMetricsArr?.map((dataObj) => dataObj.country )!
  }

  async getMetrics(country: string): Promise<object> {
    await this.loadDataFromFile()

    const countryDataArr = this.countryMetrics?.filter((dataObj) => {
      return dataObj.country == country;
    })!

    if(countryDataArr?.length == 0){
      throw new HttpException('No metrics found', ErrorCode.DATA_NOT_FOUND, 404, 'Data not found');
    }
    
    return countryDataArr[0]
  }
}

export default JsonDataHandler