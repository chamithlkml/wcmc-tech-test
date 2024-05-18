import JsonDataHandler from "../lib/json-data-handler"
import { COUNTRY_METRICS_FILE_PATH } from "../config"
import CountryData from "../lib/country-data"
import DataLoader from "../lib/data-loader"
import MetricData from "../lib/metric-data"

const jsonDataHandler = JsonDataHandler.getInstance(COUNTRY_METRICS_FILE_PATH)
const countryData = new CountryData(jsonDataHandler)
const dataLoader = new DataLoader()
const metricData = new MetricData(jsonDataHandler)

const loadCountryMetrics = async() => {
  try {
    const countries = await countryData.getCountries('');
    
    for(const country of countries){
      const countryRecord = await dataLoader.loadCountry(country);
      console.log('countryRecord', countryRecord)

      if(!countryRecord){
        throw new Error('No country record created or retrieved')
      }

      const metrics = await metricData.getMetrics(country)

      for(const metric of metrics.metrics){
        const metricRecord = await dataLoader.loadMetric(metric.name)

        console.log('metricRecord', metricRecord);

        if(!metricRecord){
          throw new Error('Failed to create metric record')
        }

        await dataLoader.loadCountryMetrics(metricRecord.id, countryRecord.id, metric.results)
      }
    }
  } catch (error) {
    console.log('Exception thrown when loading data', error) 
  }
}

loadCountryMetrics();
