const express = require('express')
const router = express.Router()
const apis = require('../data/apis.json')
const util = require('../javascripts/util.js')

const MAX_AMOUNT = 10
const SPOILER_CONFIRMATION = "yes_i_am_really_sure"

/* GET random challange */
router.get('/random', function(req, res, next) {
  try { // Don't forget your error handling, especially when working with asynchronous code

    // if no amount present send bad request
    if (!req.query.amount) {
      const error = new Error('Amount must be provided.')
      error.status = 400
      throw error
    }

    // Only values between 0 and MAX_AMOUNT
    let amount = Math.abs(req.query.amount)
    amount =  amount > MAX_AMOUNT ? MAX_AMOUNT : amount

    // Copy and shuffle the array. Hand out the wanted amount of elements
    let shuffledCopiedApiList = util.shuffle(JSON.parse(JSON.stringify(apis)))
    shuffledCopiedApiList = shuffledCopiedApiList.slice(0, amount)

    res.send(shuffledCopiedApiList)
  } catch(err) { // if error happened, pass to next middleware (in this case the error builder in app.js)

    next(err)
  }
})

/* GET all APIs */
router.get('/spoiler', function(req, res, next) {
  let areYouSure = req.query.areYouSure
  if (areYouSure !== SPOILER_CONFIRMATION) { // check if correct param given
    res.status(400)
    res.json({message: "Are you really sure though?"})
  } else {
    res.send(apis)
  }
})

module.exports = router
