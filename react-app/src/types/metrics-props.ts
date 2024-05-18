export type ProtectedAreasType = {
  metric_label: 'Protected Areas',
  marine_area_km2: number,
  terrestrial_area_km2: number,
  unprotected_area_km2: number,
  area_km2: number
}

export type LandCoverType = {
  metric_label: 'Land Cover',
  area_km2: number,
  forest: number,
  shrubland: number,
  sparse_vegetation: number,
  grassland: number,
  wetland: number,
  water: number,
  permanent_snow_and_ice: number,
  bare: number,
  agriculture: number,
  settlements: number,
  no_data: number
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