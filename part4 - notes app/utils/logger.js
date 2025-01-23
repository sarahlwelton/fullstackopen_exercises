// This will log all normal log messages
const info = (...params) => {
  console.log(...params)
}
// This will log all error messages
const error = (...params) => {
  console.error(...params)
}

// This export statement exports an object that has two fields, both of which are functions
// We can require the whole object, and use dot notation to access each function:

// logger.info('message')
// logger.error('error message')

// Or, we can destructure the functions to their own variables in the require statement:

// const { info, error } = require('./utils/logger')

// info('message')
// error('error message')

module.exports = {
  info, error
}