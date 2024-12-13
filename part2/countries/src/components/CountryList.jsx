import Country from './Country'
import Language from './Languages'

const CountryList = ({ filteredCountries }) => {
    if (filteredCountries.length >=10) {
        return (
            <div>
            <p>Too many countries to display. Try entering another filter.</p>
            </div>
        ) 
    } if (filteredCountries.length === 1) {
        const languages = Object.values(filteredCountries[0].languages)
        return (
            <div>
                <h1>{filteredCountries[0].name.common}</h1>
                <p>Capital: {filteredCountries[0].capital}</p>
                <p>Area: {filteredCountries[0].area}</p>
                <h2>Languages:</h2>
                <ul>
                    {languages.map((language, index) =>
                        <Language 
                            key={index}
                            language={language}/>)}
                </ul>
                <img src={filteredCountries[0].flags.png} alt={filteredCountries[0].flags.alt}/>
            </div>
        )
    }
    return (
        <>
        <p>Possible matches:</p>
        <ul>
        {filteredCountries.map(country =>
          <Country 
            key={country.cca2}
            country={country}
            />
        )}
      </ul>
      </>
    )
}

export default CountryList