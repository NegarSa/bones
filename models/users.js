const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
	username: {
		type: String,
		lowercase: true,
		required: [true, "username is required."],
	},
	frequency: {
		type: Number,
		min: 1,
		max: 7,
	},
});

const Users = mongoose.model("users", UsersSchema);

module.exports = Users;
