import { Table } from 'react-bootstrap';
import { getAreaPercentage } from '../lib/calc-helper'

type ProtectedAreasProps = {
  marine: number,
  terrestial: number,
  unprot: number,
  total: number
}

const ProtectedAreas = ({marine, terrestial, unprot, total}: ProtectedAreasProps) => {
  return (
    <div>
      <div className='mt-4'>
        <h4>Protected Areas</h4>
        <Table>
          <tbody>
            <tr>
              <th>Marine</th>
              <td>{marine} km<sup>2</sup>({getAreaPercentage(marine, total)})</td>
            </tr>
            <tr>
              <th>Terrestrial</th>
              <td>{terrestial} km<sup>2</sup>({getAreaPercentage(terrestial, total)})</td>
            </tr>
            <tr>
              <th>Unprotected</th>
              <td>{unprot} km<sup>2</sup>({getAreaPercentage(unprot, total)})</td>
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

export default ProtectedAreas;