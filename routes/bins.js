let BinModel = require('../models/bins.model')
let express = require('express')
let router = express.Router()
let {ObjectID} = require('mongodb')

router.post('/bins', (req, res) =>{
	if(!req.body){
		return res.status(400).send('Request body is missing')
	}

	let model = new BinModel(req.body)
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
router.get('/bins/:bin_no', (req, res) => {
	let id = req.params.bin_no

	if(!ObjectID.isValid(id)){
		return res.status(400).send('Missing URL parameter: bin_no')
	}

	BinModel.findById(id).then((doc) => {
		if (!doc) {
			return res.status(400).send('Missing URL parameter: bin_no')
		}
		res.json(doc)

	}).catch(err => {
		res.status(500).json(err)
	})

})


//we get the entire collection
router.get('/bins', (req, res) => {
	if(!req.body){
		return res.status(400).send('Missing URL parameter: bin_no')
	}
	BinModel.find({})
		.then(doc => {
			res.json(doc)
		})
})


//updates into the collection
router.put('/bins', (req, res) => {
	if(!req.query.bin_no){
		return res.status(400).send('Missing URL parameter: bin_no')
	}
	BinModel.findOneAndUpdate({
		bin_no: req.query.bin_no
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
router.delete('/bins', (req, res) => {
	if(!req.query.bin_no){
		return res.status(400).send('Missing URL parameter: bin_no')
	}
	BinModel.findOneAndDelete({
		bin_no: req.query.bin_no
	})
		.then(doc => {
			res.json(doc)
		})
		.catch(err => {
			res.status(500).json(err)
		})
})

module.exports = router
