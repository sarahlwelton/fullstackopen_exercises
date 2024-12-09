import React from 'react'
import ReactDOM from 'react-dom/client'
// Add axios library
import axios from 'axios'
// Let's add some CSS
import './index.css'

import App from './App'

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// This is not great - we only render App when we receive a successful response
/*
axios.get('http://localhost:3001/notes').then(response => {
  const notes = response.data
  ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
})

// This works but it's more common to chain the then method directly to the axios call

const promise = axios.get('http://localhost:3001/notes')

promise.then(response => {
  console.log(response)
})


axios
  .get('http://localhost:3001/notes')
  .then(response => {
    const notes = response.data
    console.log(notes)
})

const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2)

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
]

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
)
*/