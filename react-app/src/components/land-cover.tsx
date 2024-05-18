import { Table } from 'react-bootstrap';
import { getAreaPercentage } from '../lib/calc-helper'

type LandCoverProps = {
  forest: number,
  sparseVegetation: number,
  grassland: number,
  wetland: number,
  water: number,
  permSnowIce: number,
  bare: number,
  agriculture: number,
  settlements: number,
  total: number
}

const LandCover = ({forest, sparseVegetation, grassland, wetland, water, permSnowIce, bare, agriculture, settlements, total}: LandCoverProps) => {
  return (
    <div>
      <div className='mt-4'>
        <h4>Land Cover</h4>
        <Table>
          <tbody>
            <tr>
              <th>Forest</th>
              
              <td>{forest} km<sup>2</sup>({getAreaPercentage(forest, total)})</td>
            </tr>
            <tr>
              <th>Sparse Vegetation</th>
              <td>{sparseVegetation} km<sup>2</sup>({getAreaPercentage(sparseVegetation, total)})</td>
            </tr>
            <tr>
              <th>Grassland</th>
              <td>{grassland} km<sup>2</sup>({getAreaPercentage(grassland, total)})</td>
            </tr>
            <tr>
              <th>Wetland</th>
              <td>{wetland} km<sup>2</sup>({getAreaPercentage(wetland, total)})</td>
            </tr>
            <tr>
              <th>Water</th>
              <td>{grassland} km<sup>2</sup>({getAreaPercentage(water, total)})</td>
            </tr>
            <tr>
              <th>Permenant Snow and Ice</th>
              <td>{permSnowIce} km<sup>2</sup>({getAreaPercentage(permSnowIce, total)})</td>
            </tr>
            <tr>
              <th>Bare</th>
              <td>{bare} km<sup>2</sup>({getAreaPercentage(bare, total)})</td>
            </tr>
            <tr>
              <th>Agriculture</th>
              <td>{agriculture} km<sup>2</sup>({getAreaPercentage(agriculture, total)})</td>
            </tr>
            <tr>
              <th>Settlements</th>
              <td>{settlements} km<sup>2</sup>({getAreaPercentage(settlements, total)})</td>
            </tr>
            <tr>
              <th>Total</th>
              <td>{total} km<sup>2</sup>({getAreaPercentage(total, total)})</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default LandCover;