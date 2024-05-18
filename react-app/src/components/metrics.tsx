import ProtectedAreas from "./protected-areas";
import LandCover from "./land-cover";
import { useState, useEffect } from 'react';
import { LandCoverType, MetricsPropsType, ProtectedAreasType } from "../types/metrics-props";

const Metrics = ({metrics}: MetricsPropsType) => {
  const [protAreasData, setProtAreasData] = useState<null | ProtectedAreasType>(null);
  const [landCoverData, setLandCoverData] = useState<null | LandCoverType>(null);

  useEffect(() => {
    const protAreasDataArr = metrics.metrics?.filter((m) => {
      return m.name === 'Protected Areas';
    })!
    if(protAreasDataArr!.length > 0){
      console.log('prot area', protAreasDataArr![0]);
      setProtAreasData(protAreasDataArr[0] as ProtectedAreasType);
    }
    // Land Cover
    const landCoverDataArr = metrics.metrics?.filter((m) => {
      return m.name === 'Land Cover';
    })
    if(landCoverDataArr!.length > 0){
      console.log('land cover', landCoverDataArr![0]);
      setLandCoverData(landCoverDataArr![0] as LandCoverType);
    }
  }, [metrics])

  return (
    <div>
      <h3>{metrics.country}</h3>
      <hr></hr>
      {
        protAreasData && 
        <ProtectedAreas
          marine={protAreasData.results.marine_area_km2} 
          terrestial={protAreasData.results.terrestrial_area_km2}
          unprot={protAreasData.results.unprotected_area_km2} 
          total={protAreasData.results.area_km2}
        />
      }
      {
        landCoverData &&
        <LandCover
          forest={landCoverData.results.data.forest}
          sparseVegetation={landCoverData.results.data.sparse_vegetation}
          grassland={landCoverData.results.data.grassland}
          wetland={landCoverData.results.data.wetland}
          water={landCoverData.results.data.water}
          permSnowIce={landCoverData.results.data.permanent_snow_and_ice}
          bare={landCoverData.results.data.bare}
          agriculture={landCoverData.results.data.agriculture}
          settlements={landCoverData.results.data.settlements}
          total={landCoverData.results.area_km2}
        />
      }
    </div>
  )
}

export default Metrics;
