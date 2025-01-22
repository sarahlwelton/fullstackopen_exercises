// Add the mongoose definitions for connection to MongoDB
const mongoose = require('mongoose')
require('dotenv').config();

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI


console.log('connecting to', url)

mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const noteSchema = new mongoose.Schema({
  // If we want to validate the format of the data before storing it in our database, we can use our schema
    content: {
      // Our content field now has to be at least 5 characters long and is required
      // We're using built-in validators, but we can also construct our own
      type: String,
      minLength: 5,
      required: true
    },
  important: Boolean,
})

// We need to convert the _id property of the Mongoose object to a string - just to be safe
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Note', noteSchema)