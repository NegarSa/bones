import { Router } from "express";
const router = Router();
import Users from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signedCookie } from "cookie-parser";

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

router.post("/login", async (req, res, next) => {
	if (req.body.email && req.body.password) {
		const data = await Users.find({ email: req.body.email }, [
			"email",
			"password",
		]);

		if (!data.length) {
			res.sendStatus(401);
			return;
		}
		try {
			await bcrypt.compare(req.body.password, data[0]["password"]);

			const token = jwt.sign(
				{ user: data[0]["email"] },
				process.env.key,
				{ expiresIn: "1 hour" }
			);

			res.cookie("jwt", token, {
				httpOnly: true,
				//sameSite: "Strict",
				secure: true,
				signed: true,
				partitioned: true,
			}).send();
		} catch (error) {
			console.error("login failed:", error.message);
			res.sendStatus(500);
		}
	}
});

router.get("/read", async (req, res, next) => {
	if (jwt.decode(req.signedCookies["jwt"])) {
		res.json(jwt.decode(req.signedCookies["jwt"])["user"]);
	} else {
		res.sendStatus(401);
	}
});

router.get("/clear", async (req, res, next) => {
	res.clearCookie("jwt").end();
});

export default router;
