import axios from 'axios'
// Let's update the notes app to use our new backend
// const baseUrl = 'http://localhost:3001/api/notes'
// At first, this doesn't work, because of the same origin policy
// If the Access-Control-Allow-origin header isn't configured to allow cross-origin requests,
// i.e. a request to a different origin (scheme, host, and port)
// the browser will deny the request.
// To get around this, go back to the backend and install the cors middleware

// Now, let's update the baseUrl to be a relative URL, instead
const baseUrl = '/api/notes'


const getAll = () => {
    const request = axios.get(baseUrl)
    
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

  getAll: getAll, 
  create: create, 
  update: update
*/