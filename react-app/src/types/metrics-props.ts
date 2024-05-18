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

export type MetricsPropsType = {
  metrics: { 
    country: string,
    metrics: [ProtectedAreasType, LandCoverType]
  }
}

export type MetricsType = {
  country: string,
  metrics: [ProtectedAreasType, LandCoverType]
}