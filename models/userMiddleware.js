const Users = require("./users");

checkDuplicateUsernameOrEmail = (req, res, next) => {
	// Email
	Users.findOne({
		email: req.body.email,
	}).exec((err, user) => {
		if (err) {
			res.status(500).send({ message: err });
			return;
		}

		if (user) {
			res.status(400).send({
				message: "Failed! Email is already in use!",
			});
			return;
		}

		next();
	});
};

const verifySignUp = {
	checkDuplicateEmail,
};

module.exports = verifySignUp;

const registerUser = async (name, email, password) => {
	try {
		const user = new User({ name, email, password });
		await user.save();
		console.log("User registered:", user);
	} catch (error) {
		console.error("Registration failed:", error.message);
	}
};

const loginUser = async (email, password) => {
	try {
		const user = await User.findOne({ email });
		if (!user) {
			throw new Error("User not found");
		}

		const isMatch = await user.isValidPassword(password);
		if (!isMatch) {
			throw new Error("Invalid password");
		}

		console.log("Login successful!");
		// Proceed with login logic (e.g., create a session)
	} catch (error) {
		console.error("Login failed:", error.message);
	}
};
