import * as React from 'react'
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react'
import config from '../config.json'
import Metrics from './metrics';
import AlertMessage from './alert-message';

const Country = () => {
  const [countryName, setCountryName] = useState('');
  const [showMetrics, setShowMetrics] = useState(false);
  const [metrics, setMetrics] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCountryName(event.target.value);
  }

  const handleSubmission = (event: React.FormEvent) => {
    event.preventDefault();
    fetch(`http://localhost:8080/api/metrics?country=${countryName}`, {
        headers: {
          'X-Auth-Token': config.auth_token
        }
      })
      .then(response => response.json())
      .then(data => {
        if(data.errors){
          setErrorMessage(data.message)
          setShowMetrics(false);
          setMetrics({})
        }else{
          setErrorMessage(null)
          setShowMetrics(true);
          setMetrics(data)
        }
      }).catch((err) => {
        setErrorMessage(err.message)
      })
  }
  
  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-4'></div>
        <div className='col-md-4'>
          <Form onSubmit={handleSubmission}>
            <Form.Group controlId="Country">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" placeholder='Country' onChange={handleChange} />
            </Form.Group>
            <Button className='mt-2' variant='primary' type='submit'>Submit</Button>
          </Form>
        </div>
        <div className='col-md-4'></div>
      </div>
      <div className='row mt-4'>
        <div className='col-md-4'></div>
        <div className="col-md-4">
          {showMetrics && <Metrics metrics={metrics} />}
        </div>
        <div className='col-md-4'></div>
      </div>
      <div className='row mt-4'>
        <div className='col-md-4'></div>
        <div className="col-md-4">
          {errorMessage && <AlertMessage variant='danger' message={errorMessage} />}
        </div>
        <div className='col-md-4'></div>
      </div>
    </div>
  );
}

export default Country;
