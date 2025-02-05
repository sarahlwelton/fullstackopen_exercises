const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
// Wrap the app.js module in the supertest function to make it a "superagent"
const api = supertest(app)

const Note = require('../models/note')

// Let's refactor our tests to group them with describe blocks for readability
describe('when there are some notes saved initially', () => {
  beforeEach(async () => {
    await Note.deleteMany({})
    await Note.insertMany(helper.initialNotes)
  })

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content)
    assert(contents.includes('Browser can execute only JavaScript'))
  })

  describe('viewing a specific note', () => {

    test('succeeds with a valid id', async () => {
      const notesAtStart = await helper.notesInDb()

      const noteToView = notesAtStart[0]

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(resultNote.body, noteToView)
    })

    test('fails with status code 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/notes/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with status code 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/notes/${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new note', () => {
    test('succeeds with valid data', async () => {
      const newNote = {
        content: 'async/await simplifies making async calls',
        important: true,
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const notesAtEnd = await helper.notesInDb()
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

      const contents = notesAtEnd.map(n => n.content)
      assert(contents.includes('async/await simplifies making async calls'))
    })

    test('fails with status code 400 if data invalid', async () => {
      const newNote = {
        important: true
      }

      await api
        .post('/api/notes')
        .send(newNote)
        .expect(400)

      const notesAtEnd = await helper.notesInDb()

      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
    })
  })

  describe('deletion of a note', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const notesAtStart = await helper.notesInDb()
      const noteToDelete = notesAtStart[0]

      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(204)

      const notesAtEnd = await helper.notesInDb()

      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)

      const contents = notesAtEnd.map(r => r.content)
      assert(!contents.includes(noteToDelete.content))
    })
  })
})

// We will move this into test_helper.js instead.
/*const initialNotes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
]

// Before we run each test, we'll run this to clear out the database and save the two notes stored in the initialNotes array
  beforeEach(async () => {

  await Note.deleteMany({})

  //const noteObjects = helper.initialNotes
  //.map(note => new Note(note))
  // We create an array that consists of promises, created by calling the .save method of each item
  // in the noteObjects array
  // const promiseArray = noteObjects.map(note => note.save())
  // We can wait for all of the async operations to finish executing with Promise.all
  // It transforms the array of promises into a single promise, which is fulfilled once all promises in the array
  // are resolved.
  // If we want to access the returned values of each promise in the array:
  // const results = await Promise.all(promiseArray)
  // (we get an array that contains the resolved values for each promise in the promiseArray)

  // Promise.all executes all received promises in parallel.
  // If they need to be executed in a specific order, that's problematic.
  //await Promise.all(promiseArray)

  // The for...of syntax makes sure we have a specific execution order
  for (let note of helper.initialNotes) {
    let noteObject = new Note(note)
    await noteObject.save()
  }

  // This also doesn't quite work - each iteration of the forEach loop is async.
  // beforeEach doesn't wait for the forEach promises to finish.
  // The execution of tests begins immediately after beforeEach has finished - so
  // tests execute before the database state is initialized.
  await Note.deleteMany({})
  console.log('cleared')

  helper.initialNotes.forEach(async (note) => {
    let noteObject = new Note(note)
    await noteObject.save()
    console.log('saved')
  })
  console.log('done')

  // This works, but there is a better way to save multiple objects to the DB.
  await Note.deleteMany({})
  let noteObject = new Note(helper.initialNotes[0])
  await noteObject.save()
  noteObject = new Note(helper.initialNotes[1])
  await noteObject.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(r => r.content)

  assert(contents.includes('Browser can execute only JavaScript'))
})

test('a valid note can be added ', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await helper.notesInDb()
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

  const contents = notesAtEnd.map(n => n.content)
  assert(contents.includes('async/await simplifies making async calls'))
})

test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  const notesAtEnd = await helper.notesInDb()

  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
})

test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb()
  // We start by fetching a specific note from the DB
  const noteToView = notesAtStart[0]


  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  // We have to use deepStrictEqual for this test
  // We care that the values of the object fields are the same
  assert.deepStrictEqual(resultNote.body, noteToView)
})

test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb()
  // We start by fetching a specific note from the DB
  const noteToDelete = notesAtStart[0]


  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const notesAtEnd = await helper.notesInDb()

  const contents = notesAtEnd.map(r => r.content)
  assert(!contents.includes(noteToDelete.content))

  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
})
*/

// This test makes an HTTP GET request and verifies that the response is in JSON format with response code 200
/* test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    // We define the test for checking the header value in regex, but we could have also done this:
    // .expect('Content-Type', 'application/json')
    // But this means that the value of the header must be EXACTLY the same, instead of just containing application/json
    // The actual header would contain info about character encoding, which our test doesn't care about.
    .expect('Content-Type', /application\/json/)
})

// This time, lets look at the response data stored in the response.body property
// If we specify the test as test.only, we can add the --test-only flag to npm test
// to run only specific tests - or we can also just specify a specific test file
// or --test-name-pattern="" for tests with a specific name (or describe block),
// or a specific part of the name
test('there are two notes', async () => {
  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, helper.initialNotes.length)
})

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(e => e.content)
  // is the argument truthy
  assert(contents.includes('HTML is easy'))
})

// This works, but we can simplify things a little bit.
test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')

  const contents = response.body.map(e => e.content)
  assert.strictEqual(contents.includes('HTML is easy'), true)
})


// This test adds a new note, verifies that the number of notes returned by the API increases,
// and that the newly added note is in the list.
test('a valid note can be added ', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  await api
    .post('/api/notes')
    .send(newNote)
    // This initially fails because we set our API to return 200 OK instead of 201 CREATED
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // We check the state stored in the database after the saving operation by fetching all notes
  const response = await api.get('/api/notes')

  const contents = response.body.map(r => r.content)

  assert.strictEqual(response.body.length, initialNotes.length + 1)

  assert(contents.includes('async/await simplifies making async calls'))
})

// Let's write another test that verifies that a note without content will not be saved into the DB
test('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  // We check the state stored in the database after the saving operation by fetching all notes
  const response = await api.get('/api/notes')

  assert.strictEqual(response.body.length, initialNotes.length)
})
*/

after(async () => {
  await mongoose.connection.close()
})