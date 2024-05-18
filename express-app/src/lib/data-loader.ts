import DataLoadable from "../interfaces/data-loadable";
import { Prisma, PrismaClient } from '@prisma/client';
import { CountryMetricType, CountryType, MetricDataType } from "../types";

const prisma = new PrismaClient()

class DataLoader implements DataLoadable {
  async loadCountry(country: string): Promise<CountryType>{
      if(country === ''){
        throw new Error('Country should not be an empty string')
      }

      const existingCountry = await prisma.country.findUnique({
        where: {
          name: country
        }
      })

      if(!existingCountry){
        const createdCountry = await prisma.country.create({
          data: {
            name: country
          }
        })
        
        return createdCountry;
      }else{

        return existingCountry;
      }
  }

  async loadMetric(name: string): Promise<MetricDataType> {
      if(name === ''){
        throw new Error('Metric name should not be an empty string')
      }

      const existingMetrics = await prisma.metric.findUnique({
        where: {
          name: name
        }
      })

      if(existingMetrics){
        return existingMetrics
      }else{
        const createdMetric = await prisma.metric.create({
          data: {
            name: name
          }
        })

        return createdMetric;
      }
  }

  private async addUpdateCountryMetrics(metricId: number, countryId: number, name: string, value: string | number): Promise<CountryMetricType> {
      if(name === ''){
        throw new Error('name should not be an empty string')
      }

      if(value === ''){
        throw new Error('value should not be an empty string')
      }

      const existingCountryMetric = await prisma.countryMetric.findMany({
        where: {
          metricId: metricId,
          countryId: countryId,
          name: name
        }
      })

      if(existingCountryMetric.length > 0){
        const updatedCountryMetric = await prisma.countryMetric.update({
          where: {
            id: existingCountryMetric[0].id
          },
          data: {
            value: value.toString()
          }
        })

        return updatedCountryMetric;
      }else{
        const createdCountryMetric = await prisma.countryMetric.create({
          data: {
            metricId: metricId,
            countryId: countryId,
            name: name,
            value: value.toString()
          }
        })

        return createdCountryMetric;
      }
  }

  async loadCountryMetrics(metricId: number, countryId: number, results: any): Promise<void> {
    for(const [key, value] of Object.entries(results)){

      if(typeof value === 'object'){
        await this.loadCountryMetrics(metricId, countryId, value);
      }else if(typeof value === 'string' || typeof value === 'number'){
        await this.addUpdateCountryMetrics(metricId, countryId, key, value);
      }else{
        throw new Error('Unprocessable data on metrics');
      }
    }
  }

}

export default DataLoader