interface DataHandleable {
  getCountries(): Promise<string[]>;
}

export default DataHandleable