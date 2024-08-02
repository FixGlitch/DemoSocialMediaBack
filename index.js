require('dotenv').config()
const conn = require('./src/db').conn
const server = require('./src/app')
const swaggerDocs = require('./swagger')
const basicAuth = require('express-basic-auth')

const SERVER_PORT = process.env.PORT || 3001
const SWAGGER_UI_PASSWORD = process.env.SWAGGER_UI_PASSWORD

const swaggerAuthMiddleware = basicAuth({
  users: { admin: SWAGGER_UI_PASSWORD },
  challenge: true,
  realm: 'Swagger'
})

;(async () => {
  try {
    await conn.sync({ force: false })

    server.listen(SERVER_PORT, () => {
      swaggerDocs(server, SERVER_PORT, swaggerAuthMiddleware)
    })
  } catch (error) {
    console.error(
      'Unable to connect to the database or start the server:',
      error
    )
  }
})()
