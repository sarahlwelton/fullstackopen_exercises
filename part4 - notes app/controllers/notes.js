// We use this file to define all of the route handlers
// Event handlers of routes are often called controllers - so we put this in the controllers directory

// To start, we create a new router object
// It's a type of middleware, used for defining related routes
// Since the router will only be used if the URL of the request starts with /api/notes,
// we can shorten to the relative parts of the routes for each route handler
const notesRouter = require('express').Router()
const Note = require('../models/note')

// We need to add the User model so we can assign a user to each created note
const User = require('../models/user')

// Add the jsonwebtoken for authentication note requests
const jwt = require('jsonwebtoken')

// Let's change our route handler functions into async functions

notesRouter.get('/', async (request, response) => {
  const notes = await Note
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(notes)
})

/* notesRouter.get('/', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
}) */

notesRouter.get('/:id', async (request, response) => {

  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }

  /* try {
    const note = await Note.findById(request.params.id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  } catch(exception) {
    next(exception)
  } */
})

/* notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
}) */

// The helper isolates the token from the Authorization header
const getTokenFrom = request => {
  const authorization = request.get('Authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

// But how do we handle error situations with async/await?
// We use try/catch! Or the async-error library
notesRouter.post('/', async (request, response) => {
  const body = request.body
  // We use the "verify" method to check the validity and decode the token
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  // If the object decoded doesn't contain the user's identity, return an error
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    user: user.id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await user.save()

  response.status(201).json(savedNote)

  /* try {
    const savedNote = await note.save()
    response.status(201).json(savedNote)
  } catch(exception) {
    next(exception)
  } */
  /* const savedNote = await note.save()
  response.status(201).json(savedNote) */
})

// Let's rewrite this to use async/await syntax.
/* notesRouter.post('/', (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save()
    .then(savedNote => {
      response.status(201).json(savedNote)
    })
    .catch(error => next(error))
}) */

// We can also refactor our .delete route to use async/await
// When we use the async-errors library, we don't need to call next(exception) anymore
notesRouter.delete('/:id', async (request, response) => {

  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()

  // We can completely remove the try/catch block layout in this function
  /* try {
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  } */
})

/* notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
}) */

notesRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = notesRouter