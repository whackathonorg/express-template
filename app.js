require('dotenv').config() // require env variables

const createError = require('http-errors')
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const RateLimit  = require('express-rate-limit')

const indexRouter = require('./routes/index')
const app = express()

const limiter = new RateLimit({
  windowMs:5*60*1000,
  max: 150,
  message: "Too many requests."
})

app.use(limiter) // Apply rate limiter
app.use(cors()) // Allow CORS
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(indexRouter) // bind routes from ./routes/index.js

// sends no status on default for HTML favicon request
app.get('/favicon.ico', (req, res) => res.status(204))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error when not in production
  res.locals.message = err.message
  if (process.env.NODE_ENV !== 'production') {
    console.error(err)
    res.locals.error = err
  } else {
    res.locals.error = {}
  }

  // render error
  res.status(err.status || 500)
  res.send({ error: err.message })
})

module.exports = app
