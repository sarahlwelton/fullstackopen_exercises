// Now, let's use Express, instead.
const express = require('express')
const app = express()

//Install the cors middleware to allow CORS
const cors = require('cors')

// We can create our own middleware. 
// This one prints information about every request sent to the server
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

// Activate the Express json-parser to access the data in a request body
// It takes the JSON data of a request, transforms it into a JS Object, and attaches it to the body property
// of the request object before the route handler is called
app.use (express.json())
// If we want to use our own middleware, we add another statement like this
// We should put it after the express.json middleware, so the request.body can actually be initialized
// Middleware will always be called in the order it's encountered by the JavaScript engine
app.use(requestLogger)

app.use(cors())

//Use the static middleware to serve static content (i.e. the frontend)
app.use(express.static('dist'))

let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
      },
      {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
      },
      {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
      }
]

// This event handler handles HTTP GET requests made to the application's /root
app.get('/', (request, response) => {
    // Express automatically sets the Content-Type and status code to 200 (default)
    // It uses the "send" method
  response.send('<h1>Hello World!</h1>')
})

// This event handler handles HTTP GET requests made to the application's /notes
app.get('/api/notes', (request, response) => {
    // This response uses the "json" method
    // Express automatically creates a JSON formatted string
    response.json(notes)
})

// This event handler handles requests made to the unique address for a single note
// The colon syntax defines parameters (:id)
// All HTTP GET requests to /api/notes/SOMETHING will be handled here
app.get('/api/notes/:id', (request, response) => {
    // Access the id parameter in the request
    const id = request.params.id
    // Find the note
    const note = notes.find(note => note.id === id)
    
    // If we just do this, the server will always respond with a 200 OK, even if there is no matching note
    //response.json(note)

    if (note) {
        response.json(note)
      } else {
        // We don't need to display anything - this is an API, the status code is what matters
        // If we wanted to override the default status message of "NOT FOUND" we can:
        response.statusMessage = "No notes found matching that ID"
        response.status(404).end()
      }
  })

// This event handler handles requests made to delete a specific note
app.delete('/api/notes/:id', (request, response) => {
const id = request.params.id
notes = notes.filter(note => note.id !== id)

// There's no consensus on what to return with a DELETE request if the resource does not exist. 
// So, we just use 204 for a success and if there was no resource found. 
response.status(204).end()
})

// This function generates the ID for the note using the same method as the original
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

// This event handler handles HTTP POST requests for creating new notes
// It makes sure that "content" cannot be empty. 
// It defaults important to false 
// It discards all other properties
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    // No note content = 400 Bad Request
    // You must call return to stop it from executing to the end
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

// This event handler handles HTTP POST requests, for creating new notes
/* app.post('/api/notes', (request, response) => {
  const maxId = notes.length > 0
  ? Math.max(...notes.map(n => Number(n.id)))
  : 0

  const note = request.body
  console.log(note)
  // This isn't recommended, but it works for now. 
  // We calculate maxId as the length of notes, then just add 1 to get the new ID
  note.id = String(maxId + 1)

  notes = notes.concat(note)

  // Use this to double-check request headers if you're ever unsure and need to debug
  // console.log(request.headers)

  response.json(note)
}) */

// It's important, when deploying an app to the internet, to update the PORT variable to this
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// This middleware will catch requests made to non-existent routes and return an error
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


// console.log('hello world')

// Import the Node built-in web server module from CommonJS
/* const http = require('http')

let notes = [
    {
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ] */
  //const app = http.createServer((request, response) => {
    // Set Content-Type to application/json instead
    //response.writeHead(200, { 'Content-Type': 'application/json' })
    // Transforms the notes array into JSON formatted string
    //response.end(JSON.stringify(notes))
  //})

// Create a new web server and assign an event handler - it will be called every time an HTTP request
// is made to the server's address. 
// All requests are responded to with status code 200, Content-Type: text/plain
// Content of the site set to be returned is Hello World

/* const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('Hello World')
}) */

// Bind the http server assigned to app to listen to HTTP requests sent to PORT 3001
/* const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`) */