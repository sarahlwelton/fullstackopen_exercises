// We're going to simplify our application - separate the web server from the Express app
// We import the actual application, and start it
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

// We just use this to tell us the application is running. 
app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})