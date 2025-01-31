// We use this file to define all of the route handlers
// Event handlers of routes are often called controllers - so we put this in the controllers directory

// To start, we create a new router object
// It's a type of middleware, used for defining related routes
// Since the router will only be used if the URL of the request starts with /api/notes,
// we can shorten to the relative parts of the routes for each route handler
const notesRouter = require('express').Router()
const Note = require('../models/note')

// Let's change our route handler functions into async functions

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({})
  response.json(notes)
})

/* notesRouter.get('/', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
}) */

notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// But how do we handle error situations with async/await?
// We use try/catch!
notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  try {
    const savedNote = await note.save()
    response.status(201).json(savedNote)
  } catch(exception) {
    next(exception)
  }
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

notesRouter.delete('/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

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