import * as React from 'react'
import { Form } from 'react-bootstrap';
import { useState } from 'react'
import config from '../config.json'
import Metrics from './metrics';
import AlertMessage from './alert-message';
import CountrySuggestion from './country-suggestion';
import { MetricsType } from '../types/metrics-props';

const Country = () => {
  const [typedCountry, setTypedCountry] = useState('')
  const [metricsData, setMetricsData] = useState<MetricsType | null>(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [countrySuggestions, setCountrySuggestions] = useState<string[]>([]);

  const loadMetrics = async(country: string) => {
    try {
      const data = await getMetrics(country);
      if(data.errors){
        setErrorResponse(data.message)
      }else{
        setErrorMessage(null)
        setMetricsData(data)
      }
    } catch (error) {
      console.log('Fetching metrics', error);
      setErrorResponse('An unexpected error occured.')
    }
  }

  const selectCountry = async(country: string) => {
    setCountrySuggestions([]);
    setTypedCountry(country)

    await loadMetrics(country);
  }

  const setErrorResponse = (message: string) => {
    setErrorMessage(message)
    setMetricsData(null)
  }

  const handleChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setTypedCountry(event.target.value);
      const data = await getCountries();

      if(data.errors){
        setErrorResponse(data.message)
      }else{
        setCountrySuggestions(data as string[]);
      }
    } catch (error) {
      console.log('Fetching countries', error);
      setErrorResponse('An unexpected error occured.')
    }
  }

  const getMetrics = async(country: string) => {
    const response = await fetch(`http://localhost:8080/api/metrics?country=${country}`, {
                        headers: {
                          'X-Auth-Token': config.auth_token
                        }
                      })
    const data = await response.json()
    return data
  }

  const getCountries = async() => {
    const response = await fetch(`http://localhost:8080/api/countries?prefix=${typedCountry}`, {
      headers: {
        'X-Auth-Token': config.auth_token
      }
    });
    const data = await response.json();
    return data;
  }

  const handleSubmission = async (event: React.FormEvent) => {
    event.preventDefault();
  }
  
  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-4'></div>
        <div className='col-md-4'>
          <Form onSubmit={handleSubmission}>
            <Form.Group controlId="Country">
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" placeholder='Country' onChange={handleChange} value={typedCountry} />
            </Form.Group>
          </Form>
        </div>
        <div className='col-md-4'></div>
      </div>
      <div className='row mt-4'>
        <div className='col-md-4'></div>
        <div className='col-md-4'>
          {
          countrySuggestions && 
              countrySuggestions.map(country => {
                return <CountrySuggestion
                 key={country}
                 country={country}
                 clickHandler={selectCountry}
                />
              })
          }
        </div>
        <div className='col-md-4'></div>
      </div>
      <div className='row mt-4'>
        {metricsData && <Metrics metrics={metricsData} />}
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
