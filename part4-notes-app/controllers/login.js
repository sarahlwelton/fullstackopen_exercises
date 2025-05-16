const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body
  // To start, we search for the user in the DB with the username in the request
  const user = await User.findOne({ username })
  // We compare the password attached to the request, using bcrypt, to the hash
  // inside the DB
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
  // If the username and password are not correct, return 401 Unauthorized
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }
  // If the username and password are correct, then jwt creates a token with the username and ID
  // The token is digitally signed with the string from process.env.SECRET
  // Only parties who know the secret can generate a valid token
  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    // To make things more secure, we can set a timeout on the token
    // It can make things more secure, but also if the timeout is too short, it
    // can be inconvenient for the user
    { expiresIn: 60*60 }
    // We could also consider saving the token to the database and check the access right
    // validity for tokens for each API request.
    // But that increases complexity and has a negative effect on performance
    // Specialized DBs like Redis can be used to be faster
    // We could also consider making tokens just random strings, and cookies
  )

  response
    .status(200)
    // When everything is valid, send back the username and token
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter