import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

// the methods really only need to return the response data, not the entire request

const getAll = () => {
    const request = axios.get(baseUrl)
    // Let's create a note that doesn't exist on the server
    const nonExisting = {
      id: 10000,
      content: 'This note is not saved to server',
      important: true,
    }
    return request.then(response => response.data.concat(nonExisting))
  }

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update }
    
/*
// We don't need to write it this way, as the keys and variables are the same
  getAll: getAll, 
  create: create, 
  update: update
*/