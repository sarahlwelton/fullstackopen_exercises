import { useState, useEffect } from 'react'
import CountryList from './components/CountryList'
import countryService from './services/countries'
import weatherService from './services/weather'

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [units, setUnits] = useState('metric')
  const [unitLabel, setUnitLabel] = useState(true)

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.official.toLowerCase().includes(filter) || country.name.common.toLowerCase().includes(filter)
  )

  const handleCountryChange = (event) => {
    setFilter(event.target.value.toLowerCase())
    console.log(filter)
    setSelectedCountry(null)
    setUnits('metric')
    setUnitLabel(true)
  }

  const showCountry = ({country}) => {
    console.log('showCountry receives', country)
    countryService
      .getCountry(country.name.common)
      .then(singleCountry => {
        setSelectedCountry(singleCountry)
      })
  }

  const changeUnits = () => {
    if (units === 'metric') {
        setUnits('imperial')
        setUnitLabel(false)
    } if (units === 'imperial') {
        setUnits('metric')
        setUnitLabel(true)
    }
}

  return (
    <div>
      <h1>Countries</h1>
      <div>
        <form>
          Find a Country: 
          <input 
            onChange={handleCountryChange}
          />
        </form>
      </div>
      <CountryList 
        filteredCountries={filteredCountries}
        showCountry={showCountry}
        selectedCountry={selectedCountry}
        changeUnits={changeUnits}
        unitLabel={unitLabel}
        setUnits={setUnits}
        units={units} />
    </div>
  )
}

export default App
