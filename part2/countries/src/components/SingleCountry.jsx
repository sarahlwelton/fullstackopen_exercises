import Language from './Languages'
import weatherService from '../services/weather'
import {useState, useEffect} from 'react'

const SingleCountry = ({singleCountry, languages, changeUnits, unitLabel, setUnits, units}) => {

    const [weather, setWeather] = useState(null)

    console.log('country is', singleCountry)

    useEffect(() => {
        function getWeather() {
            setUnits('metric')
            const newWeather = 
                weatherService
                .getWeather(singleCountry.capitalInfo.latlng[0], singleCountry.capitalInfo.latlng[1], units)
                .then(newWeather => 
                    setWeather(newWeather)
                )
        }
        getWeather();
      }, [singleCountry])

    useEffect(() => {
        const newWeather = 
            weatherService
                        .getWeather(singleCountry.capitalInfo.latlng[0], singleCountry.capitalInfo.latlng[1], units)
                        .then(newWeather => 
                            setWeather(newWeather)
                        )
    }, [unitLabel])
 
    console.log('weather is', weather)

    

    return (
        <>
            <h1>{singleCountry.name.common}</h1>
            <p>Capital: {singleCountry.capital}</p>
            <p>Area: {singleCountry.area}</p>
            <h2>Languages:</h2>
            <ul>
                {languages.map((language, index) =>
                    <Language 
                        key={index}
                        language={language}/>)}
            </ul>
            <img src={singleCountry.flags.png} alt={singleCountry.flags.alt}/>
            { weather && 
                <div>
                    <h2>Weather in {singleCountry.capital}:</h2>
                    <p>Temperature: {weather.main.temp} {unitLabel ? 'C' : 'F'} <button onClick={() => changeUnits()}>Change to {unitLabel ? 'F' : 'C'}</button></p> 
                    <img src= {`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                    <p>{weather.weather[0].main}</p>
                    <p>Wind: {weather.wind.speed} {unitLabel ? 'meters/sec' : 'miles/hour'}</p>
                </div>
            }
        </>
    )
}

export default SingleCountry