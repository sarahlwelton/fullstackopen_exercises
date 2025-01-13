import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl = 'https://api.openweathermap.org'

const getWeather = async (lat, lon) => {
    const response = await axios.get(`${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
    console.log(response.data)
    return response.data
}

export default { getWeather }