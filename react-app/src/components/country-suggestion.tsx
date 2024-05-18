import { Button } from "react-bootstrap"

interface selectCountry {
  (selection: string): void;
}

type CountrySuggestionProps = {
  country: string,
  clickHandler: selectCountry
}

const CountrySuggestion = ({ country, clickHandler }: CountrySuggestionProps) => {
  
  const suggestionClickHandler = async(event: any) => {
    await clickHandler(country)
  }
  
  return (
    <div className='row'>
      <div className='col-md-4'></div>
      <div className='col-md-4'>
        <Button onClick={suggestionClickHandler} className='mt-1' variant='secondary'>{country}</Button>
      </div>
      <div className='col-md-4'></div>
    </div>
  )
}

export default CountrySuggestion;