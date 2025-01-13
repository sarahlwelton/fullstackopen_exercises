import Country from './Country'
import SingleCountry from './SingleCountry'

const CountryList = ({ filteredCountries, showCountry, selectedCountry }) => {

    if (selectedCountry.length !== 0) {
        const languages = Object.values(selectedCountry[0].languages)
        return (
            <div>
                <SingleCountry
                    singleCountry={selectedCountry}
                    languages={languages} />
            </div>
        )
    }if (filteredCountries.length >=10) {
        return (
            <div>
            <p>Too many countries to display. Try entering another filter.</p>
            </div>
        ) 
    } if (filteredCountries.length === 1) {
        const languages = Object.values(filteredCountries[0].languages)
        return (
            <div>
                <SingleCountry 
                    singleCountry={filteredCountries}
                    languages={languages} />
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
            showCountry={() => showCountry({country})}
            />
        )}
      </ul>
      </>
    )
}

export default CountryList