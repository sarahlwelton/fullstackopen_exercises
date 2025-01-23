const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://sarahwelton:${password}@fullstackopen-part3.rsmpm.mongodb.net/noteApp?retryWrites=true&w=majority&appName=fullstackopen-part3`

mongoose.set('strictQuery',false)

mongoose.connect(url)

// This defines the schema for a note - tells Mongoose how to store note objects 
// in the database
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})

// This defines the model for a Note - we need to convert schemas into Models to use
// By using Note as the singular model name, Mongoose creates a collection as the lowercase plural, notes
const Note = mongoose.model('Note', noteSchema)
// MongoDB itself doesn't care about the structure of the documents in the database
// Mongoose helps define the schema at the application level

// This code should find each note stored in the database
// We don't set any search conditions in the .find method for the Note model, so we get all notes
Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })

// To find only important notes: 
/* Note.find({ important: true }).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  }) */

// Using the Note model constructor function, we create a new note
/* const note = new Note({
  content: 'HTML is easy',
  important: true,
}) */

// This saves the new note object to the database 
// After the object is saved, the code executes the event handler in the then()
// The connection is then closed
/* note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
}) */