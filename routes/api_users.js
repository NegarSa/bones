import { Router } from "express";
const router = Router();
import Users from "../models/users.js";

router.get("/users", (req, res, next) => {
	Users.find({})
		.then((data) => res.json(data))
		.catch(next);
});

router.post("/newuser", async (req, res, next) => {
	if (req.body.username && req.body.email && req.body.password) {
		const data = await Users.find({ email: req.body.email });
		if (data.length) {
			res.sendStatus(500);
			return;
		}

		try {
			Users.create(req.body)
				.then((data) => res.json(data))
				.catch(next);
			console.log("User registered");
		} catch (error) {
			console.error("Registration failed:", error.message);
			res.sendStatus(500);
		}
	}
});
export default router;
