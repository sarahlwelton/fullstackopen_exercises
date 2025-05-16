import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  // We add a new private variable 
  // It can be changed by calling setToken
  token = `Bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    /* const nonExisting = {
      id: 10000,
      content: 'This note is not saved to server',
      important: true,
    } */
    //return request.then(response => response.data.concat(nonExisting))
    return request.then(response => response.data)
  }
// Update the create service so that it uses an authorization token
const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  // We send the config object as the third parameter of POST
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }