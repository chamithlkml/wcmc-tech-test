export type CountryType = {
  id: number,
  name: string,
  createdAt: Date,
  updatedAt: Date
} | null;

export type MetricDataType = {
  id: number,
  name: string,
  createdAt: Date,
  updatedAt: Date,
} | null;

export type CountryMetricType = {
  id: number,
  metricId: number,
  countryId: number,
  name: string,
  value: string | number,
  createdAt: Date;
  updatedAt: Date;
} | null;

export type ProtectedAreasType = {
  name: 'Protected Areas',
  results: {
    marine_area_km2: number,
    terrestrial_area_km2: number,
    unprotected_area_km2: number,
    area_km2: number
  }
}

export type LandCoverType = {
  name: 'Land Cover',
  results: {
    area_km2: number,
    data: {
      forest: number,
      sparse_vegetation: number,
      grassland: number,
      wetland: number,
      water: number,
      permanent_snow_and_ice: number,
      bare: number,
      agriculture: number,
      settlements: number
    }
  }
}

export type MetricType = {
  country: string,
  metrics: [
    any
  ]
}