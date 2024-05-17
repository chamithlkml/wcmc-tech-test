interface DataHandleable {
  getCountries(prefix: string): Promise<string[]>
  getMetrics(country: string): Promise<object>
}

export default DataHandleable