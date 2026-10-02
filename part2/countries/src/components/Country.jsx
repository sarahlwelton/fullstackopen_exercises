import { useEffect, useState } from 'react'
import weatherService from '../services/weather'

const Country = ({ country }) => {

  const [weather, setWeather] = useState(null)

  const languages = country.languages

  useEffect(() => {
        weatherService
          .getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
          .then(response => {
            setWeather(response)
          })
    }, [])

  console.log(weather)

  return (
    <>
      <div>
        <h2>{country.name.common}</h2>
        <h3>Capital</h3>
        <p>{country.capital}</p>
        <h3>Area</h3>
        <p>{country.area}</p>
        <h3>Languages</h3>
        <ul>
          {Object.entries(languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
        </ul>
        <img src={country.flags.svg} />
      </div>
      <div>
        <h3>Weather in {country.capital}</h3>
        <p>Temperature: {weather.current.temperature_2m}{weather.current_units.temperature_2m}</p>
      </div>
    </>
    
  )
}

export default Country