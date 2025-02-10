const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// Let's add a route to fetch all of the users in the DB
usersRouter.get('/', async (request, response) => {
  // We can get Mongoose to do a psuedo "join" query
  // and also return the contents of the notes instead of just the IDs
  //const users = await User.find({}).populate('notes')

  // Let's update the syntax to only pick specific fields from the note objects
  const users = await User
    .find({}).populate('notes', { content: 1, important: 1 })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  // We don't store the password, we only store the hash with the bcrypt.hash function
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter