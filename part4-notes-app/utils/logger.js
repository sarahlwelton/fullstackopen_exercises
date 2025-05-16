// We'll modify the logger to not log messages when running in TEST mode
const info = (...params) => {

  if (process.env.NODE_ENV !== 'test') { 
    console.log(...params)
  }
}

const error = (...params) => {

  if (process.env.NODE_ENV !== 'test') { 
    console.error(...params)
  }
}

module.exports = {
  info, error
}

// This will log all normal log messages
/*const info = (...params) => {
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
*/