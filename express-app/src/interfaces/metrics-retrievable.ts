interface MetricsRetrievable {
  getMetrics(country: string): Promise<object>
}

export default MetricsRetrievable;