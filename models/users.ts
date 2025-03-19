import mongoose, { Error } from "mongoose";
import bcrypt from "bcrypt";

export interface User extends mongoose.Document {
	username: string,
	email: string,
	password: string,
	frequency: Number,
	seed: Number,
	createdAt: Date,
}

const UsersSchema = new mongoose.Schema<User>({
	username: {
		type: String,
		lowercase: true,
		required: [true, "username is required."],
	},
	email: {
		type: String,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
	},
	frequency: {
		type: Number,
		min: 1,
		max: 7,
	},
	seed: {
		type: Number,
		default: 123456789,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});


UsersSchema.pre("save", async function (next) {
	try {
		// Check if the password has been modified
		if (!this.isModified("password")) return next();

		// Generate a salt and hash the password
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);

		next(); // Proceed to save
	} catch (error: any) {
		next(error); // Pass any errors to the next middleware
	}
});

UsersSchema.methods.isValidPassword = async function (password: string) {
	try {
		// Compare provided password with stored hash
		return await bcrypt.compare(password, this.password);
	} catch (error) {
		throw new Error("Password comparison failed");
	}
};

const Users = mongoose.model<User>("users", UsersSchema);
export default Users;
