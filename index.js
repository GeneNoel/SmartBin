const express = require('express')
const app = express()
let appRoute = require('./routes/approute')
let collectorRoute = require('./routes/collectors')
let binRoute = require('./routes/bins')
let path =require('path');
const port = process.env.PORT || 3000;
const bodyparser = require("body-parser")

app.use(bodyparser.json());

app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
  next()
})


app.use(appRoute)
app.use(collectorRoute)
app.use(binRoute)
app.use(express.static('public'))


app.get('/', function(req, res){
	res.json({
	status: 'Working...',
	message: 'Welcome to our SmartBin API',
	});
});


app.use((req, res, next) => {
	res.status(404).send('You are lost. We know! we have all been there...So no need to feel bad!')
})


app.listen(port, function(){
	console.log(`Started up at port ${port}`)
});