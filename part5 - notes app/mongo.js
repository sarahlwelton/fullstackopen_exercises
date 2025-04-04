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



const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean
})



const Note = mongoose.model('Note', noteSchema)





Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })

