import { CountryMetricType, CountryType, MetricDataType } from "../types";

interface DataLoadable {
  loadCountry(country: string): Promise<CountryType>;
  loadMetric(name: string): Promise<MetricDataType>;
  loadCountryMetrics(metricId: number, countryId: number, results: any): Promise<void>
}

export default DataLoadable;