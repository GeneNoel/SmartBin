let mongoose = require('mongoose')

mongoose.connect(`mongodb://localhost:27017/smartbin`, {useNewUrlParser: true})

let BinSchema =  new mongoose.Schema({
	bin_no: {
		type: String,
		require: true,
		unique: true
	},
	bin_size:String,
	collectors_id: String,
	status: String,
})

module.exports = mongoose.model('bins', BinSchema)
