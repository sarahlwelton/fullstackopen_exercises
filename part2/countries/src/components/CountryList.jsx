import Country from "./Country"
import countryService from "../services/country"

const CountryList = ({ countries, setFilteredCountries }) => {

  const getCountry = (name) => {
    countryService
      .getCountry(name)
      .then(returnedCountry => 
        setFilteredCountries([returnedCountry])
      )
  }

  if (countries === null) {
    return (
      <></>
    )
  }
  if (countries.length >= 10) {
    return (
      <>
        <p>Too many matches. Enter a more specific filter.</p>
      </>
    )
  } if (countries.length < 10 && countries.length > 1) {
    return (
      <>
        <div>
          {countries.map(country => 
            <p key={country.cca3}>
              {country.name.common}
              <button onClick={() => getCountry(country.name.common.toLowerCase())}>Show</button>
            </p>
          )}
        </div>
      </>
    )
  } if (countries.length === 1) {

    return (
      <>
        <Country country={countries[0]} />
      </>
    )
  }
}

export default CountryList