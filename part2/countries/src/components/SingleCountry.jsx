import Language from './Languages'
import weatherService from '../services/weather'
import {useState, useEffect} from 'react'

const SingleCountry = ({singleCountry, languages}) => {
    const [weather, setWeather] = useState({})

    useEffect(() => {
        async function getWeather() {
            const newWeather = await weatherService.getWeather(singleCountry[0].capitalInfo.latlng[0], singleCountry[0].capitalInfo.latlng[1])
            setWeather(newWeather)
        }
        getWeather();
      }, [selectedCountry])

    console.log('weather is', weather)

    return (
        <>
            <h1>{singleCountry[0].name.common}</h1>
            <p>Capital: {singleCountry[0].capital}</p>
            <p>Area: {singleCountry[0].area}</p>
            <h2>Languages:</h2>
            <ul>
                {languages.map((language, index) =>
                    <Language 
                        key={index}
                        language={language}/>)}
            </ul>
            <img src={singleCountry[0].flags.png} alt={singleCountry[0].flags.alt}/>
            <h2>Weather in {singleCountry[0].capital}:</h2>
            <p>Temperature: {weather.main.temp}</p>
        </>
    )
}

export default SingleCountry