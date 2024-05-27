import ProtectedAreas from "./protected-areas";
import LandCover from "./land-cover";
import { useState, useEffect } from 'react';
import { LandCoverType, MetricsPropsType, ProtectedAreasType } from "../types/metrics-props";

const Metrics = ({metrics}: MetricsPropsType) => {
  const [protAreasData, setProtAreasData] = useState<null | ProtectedAreasType>(null);
  const [landCoverData, setLandCoverData] = useState<null | LandCoverType>(null);

  useEffect(() => {
    setProtAreasData(null);
    setLandCoverData(null);
    // Protected Areas
    const protAreasDataArr = metrics.metrics?.filter((m) => {
      return m.metric_label === 'Protected Areas';
    })!
    if(protAreasDataArr!.length > 0){
      console.log('prot area', protAreasDataArr![0]);
      setProtAreasData(protAreasDataArr[0] as ProtectedAreasType);
    }
    // Land Cover
    const landCoverDataArr = metrics.metrics?.filter((m) => {
      return m.metric_label === 'Land Cover';
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
          marine={protAreasData.marine_area_km2} 
          terrestial={protAreasData.terrestrial_area_km2}
          unprot={protAreasData.unprotected_area_km2} 
          total={protAreasData.area_km2}
        />
      }
      {
        landCoverData &&
        <LandCover
          forest={landCoverData.forest}
          sparseVegetation={landCoverData.sparse_vegetation}
          grassland={landCoverData.grassland}
          wetland={landCoverData.wetland}
          water={landCoverData.water}
          permSnowIce={landCoverData.permanent_snow_and_ice}
          bare={landCoverData.bare}
          agriculture={landCoverData.agriculture}
          settlements={landCoverData.settlements}
          total={landCoverData.area_km2}
        />
      }
    </div>
  )
}

export default Metrics;
