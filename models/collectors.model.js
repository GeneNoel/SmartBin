let mongoose = require('mongoose')

mongoose.connect(`mongodb://localhost:27017/smartbin`, {useNewUrlParser: true})

let CollectorSchema =  new mongoose.Schema({
	collector_id: {
		type: String,
		require: true,
		unique: true
	},
	collector_name:String,
	bin_no: [],
	password:{
		type: String,
		require: true
	}
})

module.exports = mongoose.model('collectors', CollectorSchema)