import mongoose from "mongoose";

const TasksSchema = new mongoose.Schema({
	action: {
		type: String,
		required: [true, "Task description is required."],
	},
	description: {
		type: String,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Users",
	},
	status: {
		type: Boolean,
		default: 0,
		required: [true, "Every task has a status."],
	},
	type_of_day: {
		type: String,
		lowercase: true,
		enum: ["bones", "no-bones", "both"],
	},
	deadline: {
		type: Date,
	},
	date_created: {
		type: Date,
		default: Date.now,
	},
});

const Tasks = mongoose.model("tasks", TasksSchema);

export default Tasks;
