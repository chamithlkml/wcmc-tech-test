import DataHandleable from "../interfaces/data-handleable";
import MetricsRetrievable from "../interfaces/metrics-retrievable";

class MetricData implements MetricsRetrievable {
  private dataHandler: DataHandleable

  constructor(dataHandler: DataHandleable){
    this.dataHandler = dataHandler
  }

  async getMetrics(country: string): Promise<object> {
      return await this.dataHandler.getMetrics(country)
  }
}

export default MetricData