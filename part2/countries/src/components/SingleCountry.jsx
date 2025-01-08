import Language from './Languages'

const SingleCountry = ({singleCountry, languages}) => {
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
        </>
    )
}

export default SingleCountry