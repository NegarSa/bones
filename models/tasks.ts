import mongoose from "mongoose";

export interface Task extends mongoose.Document {
	action: string;
	description: string;
	status: boolean;
	progress: Number;
	type_of_day: "bones" | "no bones" | "both";
	deadline: Date;
	date_created: Date;
	user: mongoose.Schema.Types.ObjectId;
	subtasks: [string];
}

const TasksSchema = new mongoose.Schema<Task>({
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
		default: false,
		required: [true, "Every task has a status."],
	},
	progress: {
		type: Number,
		min: 0,
		max: 100,
	},
	type_of_day: {
		type: String,
		lowercase: true,
		enum: ["bones", "no-bones", "both"],
	},
	subtasks: {
		type: [String],
	},
	deadline: {
		type: Date,
	},
	date_created: {
		type: Date,
		default: Date.now,
	},
});

const Tasks = mongoose.model<Task>("tasks", TasksSchema);

export default Tasks;
