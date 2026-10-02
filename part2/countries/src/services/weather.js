import axios from 'axios'

const baseUrl = 'https://api.open-meteo.com/v1/forecast?'

//const api_key = import.meta.env.VITE_WEATHER_API_KEY

const getWeather = (lat, lon) => {
  const request = axios.get(`${baseUrl}latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`)
  return request.then(response => response.data)
}

export default { getWeather }