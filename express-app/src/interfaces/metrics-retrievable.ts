interface MetricsRetrievable {
  getMetrics(country: string): Promise<any>
}

export default MetricsRetrievable;