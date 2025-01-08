const Country = ({ country, showCountry }) => {
    return (
        <li>
            {country.name.common} <button onClick={() => showCountry({country})}>Show</button>
        </li>
    )
}

export default Country