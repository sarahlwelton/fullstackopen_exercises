import { useState, useEffect} from 'react'
import CountryList from './components/CountryList'
import countryService from './services/country'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState(null)

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

  const handleFilterChange = (event) => {

    setFilter(event.target.value)

    if (filter.length > 1) {
      setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())))
    } if (filter.length <= 1) {
      setFilteredCountries(countries) 
    }
  }
  
  return (
    <>
      <h1>Countries</h1>
      <div>
        search countries: <input value={filter} onChange={handleFilterChange}></input>
      </div>
      <div>
        <CountryList countries={filteredCountries} setFilteredCountries={setFilteredCountries} />
      </div>
    </>
  )

}

export default App