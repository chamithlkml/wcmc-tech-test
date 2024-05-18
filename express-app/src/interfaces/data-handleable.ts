import { MetricType } from "../types"

interface DataHandleable {
  getCountries(prefix: string): Promise<string[]>
  getMetrics(country: string): Promise<MetricType>
}

export default DataHandleable