interface DataHandleable {
  getCountries(prefix: string): Promise<string[]>;
}

export default DataHandleable