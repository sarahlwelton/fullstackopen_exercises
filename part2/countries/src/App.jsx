import { useState, useEffect} from 'react'
import Country from './components/Country'
import countryService from './services/country'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
      countryService
        .getAll()
        .then(response => {
          setCountries(response)
        })
  }, [])

  if (!countries) {
    return null
  }
  // TODO: Figure out how you want to handle the filter? Right now it doesn't reset fully if the user deletes all input. 
  // I think I remember setting up a second list of the filtered countries and keeping the full getAll() always in-state. 
  const handleFilterChange = (event) => {
    event.preventDefault()

    setFilter(event.target.value)

    if (filter.length > 0) {
      setCountries(countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())))
    } if (filter.length === 0) {
      countryService
        .getAll()
        .then(response => 
          setCountries(response)) 
    }
  }
  
  return (
    <>
      <h1>Countries</h1>
      <div>
        search countries: <input value={filter} onChange={handleFilterChange}></input>
      </div>
      <div>
        {countries.map(country => 
          <Country
            key={country.cca3}
            country={country}
          />
        )}
      </div>
    </>
  )

}

export default App