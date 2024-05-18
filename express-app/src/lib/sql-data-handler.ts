import { ErrorCode } from "../exceptions/http-exception";
import { InternalException } from "../exceptions/internal-exception";
import DataHandleable from "../interfaces/data-handleable";
import { PrismaClient } from '@prisma/client';
import { MetricType } from "../types";
import _ from "lodash";

class SqlDataHandler implements DataHandleable{
  private static instance: SqlDataHandler;
  private prisma: PrismaClient;

  private constructor(){
    this.prisma = new PrismaClient()
  }

  public static getInstance(): SqlDataHandler {
    if(!SqlDataHandler.instance){
      SqlDataHandler.instance = new SqlDataHandler()
    }

    return SqlDataHandler.instance;
  }

  async getCountries(prefix: string): Promise<string[]> {
    let countries: any[];

    if(prefix == ''){
      countries = await this.prisma.country.findMany({
        select: {
          name: true
        }
      })
    }else{
      const regexPattern = `(?i)\\b\\w*${prefix}\\w*\\b`;
      countries = await this.prisma.$queryRawUnsafe(
        'SELECT * FROM countries WHERE name REGEXP ?',
        regexPattern
      )
    }
    
    if(!countries){
      throw new InternalException('Issue with country retrieval query', ErrorCode.INTERNAL_ERROR, 500)
    }

    const prefixLowercase = prefix.toLowerCase();
    const filteredCountries = countries.filter((country) => {
      let words = country.name.split(' ')
      let matchingWords = words.filter((word: string) => {
        return word.toLowerCase().startsWith(prefixLowercase)
      })

      return matchingWords.length > 0;
    });

    const countryArr = filteredCountries.map((c) => {
      return c.name;
    })

    return countryArr;
  }

  async getMetrics(country: string): Promise<MetricType> {
    
    const countryMetricRecords = await this.prisma.$queryRawUnsafe(
      `SELECT cm.name AS metric_name, cm.value AS metric_value, m.name AS metric, c.name AS country 
      FROM country_metrics AS cm INNER JOIN metrics AS m on cm.metricId = m.id 
      INNER JOIN countries AS c on cm.countryId = c.id
      WHERE c.name = ?;`,
      country
    )

    if(!countryMetricRecords){
      throw new InternalException('Metrics not found', ErrorCode.DATA_NOT_FOUND, 500)
    }

    const countryMetricsGroupByMetric = _.groupBy(countryMetricRecords, ({ metric }) => metric)

    let countryMetricsArr = [];

    for(const [metricName, metricArr] of Object.entries(countryMetricsGroupByMetric)){

      const transformedData = metricArr.reduce((acc, item: {metric_name: string, metric_value: string}) => {
        acc[item.metric_name] = +item.metric_value;
        return acc;
      }, {metric_label: metricName} as Record<string, string | number>)

      countryMetricsArr.push(transformedData);
    }

    return {
      country: country,
      metrics: countryMetricsArr
    }
  }
}

export default SqlDataHandler;