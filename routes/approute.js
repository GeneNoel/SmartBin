let express = require('express')
let router = express.Router()

router.get('/approute', (req, res) => {
  if (req.query.name) {
  	 res.send(`You have requested a person ${req.query.name}`)
  } 
  else {
  	 res.send(`You have requested a person`)
  }
})

router.get('/approute/:name', (req, res) => {
  res.send(`You have requested a person ${req.params.name}`)
})
/*router.get('/person/:name', (req, res) => {
  res.send(`You have requested a person ${req.params.name}`)
})*/

module.exports = router 