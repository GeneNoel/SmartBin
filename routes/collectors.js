let CollectorModel = require('../models/collectors.model')
let express = require('express')
let router = express.Router()
//const app = express()
let {ObjectID} = require('mongodb')

router.get('/', (req, res) =>{
	return res.status(300).send('Request body is missing. Please use /collectors or /bin')
})

//for posting or adding into the collection
router.post('/collectors', (req, res) =>{
	if(!req.body){
		return res.status(400).send('Request body is missing')
	}

	let model = new CollectorModel(req.body)
	model.save()
		.then(doc => {
			if(!doc || doc.length === 0){
				return res.status(500).send(doc)
			}
			res.status(201).send(doc)
		})
		.catch(err => {
			res.status(500).json(err)
		})
})


//in thIS one, we get by ID
router.get('/collectors/:collector_id', (req, res) => {
	let id = req.params.collector_id

	if(!ObjectID.isValid(id)){
		return res.status(400).send('Missing URL parameter: collector_id')
	}

	CollectorModel.findById(id).then((doc) => {
		if (!doc) {
			return res.status(400).send('Missing URL parameter: collector_id')
		}
		res.json(doc)

	}).catch(err => {
		res.status(500).json(err)
	})

})

//we get the entire collection
router.get('/collectors', (req, res) => {
	if(!req.body){
		return res.status(400).send('Missing URL parameter: collectors')
	}
	CollectorModel.find({})
		.then(doc => {
			res.json(doc)
		})
})

//updates into the collection
router.put('/collectors', (req, res) => {
	if(!req.query.collector_id){
		return res.status(400).send('Missing URL parameter: collector_id')
	}
	CollectorModel.findOneAndUpdate({
		collector_id: req.query.collector_id
	}, req.body, {
		new: true
	})
		.then(doc => {
			res.json(doc)
		})
		.catch(err => {
			res.status(500).json(err)
		})
})


//deletes an entire collection
router.delete('/collectors', (req, res) => {
	if(!req.query.collector_id){
		return res.status(400).send('Missing URL parameter: collector_id')
	}
	CollectorModel.findOneAndDelete({
		collector_id: req.query.collector_id
	})
		.then(doc => {
			res.json(doc)
		})
		.catch(err => {
			res.status(500).json(err)
		})
})
module.exports = router
