import fs from 'node:fs/promises'
import { ErrorCode } from "../exceptions/http-exception";
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

  async getCountries(): Promise<string[]> {
    await this.loadDataFromFile()

    const countries = this.countryMetrics!.map((dataObj: MetricData) => {
      return dataObj.country;
    })

    return countries
  }
}

export default JsonDataHandler