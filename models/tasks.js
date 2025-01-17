const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TasksSchema = new Schema({
	action: {
		type: String,
		required: [true, 'Task description is required.'],
	},
	status: {
		type: Boolean,
		default: 0,
		required: [true, 'Every task has a status.']
	},
	type_of_day: {
		type: String,
		lowercase: true,
		enum: ['bones', 'no-bones', 'both']
	},
	deadline: {
		type: Date,
	},
	date_created: {
		type: Date,
		default: Date.now
	},
});

const Tasks = mongoose.model('tasks', TasksSchema);

module.exports = Tasks;