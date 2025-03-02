import { Router } from "express";
const router = Router();
import Users from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function sfc32(a, b, c, d) {
	return function () {
		a |= 0;
		b |= 0;
		c |= 0;
		d |= 0;
		let t = (((a + b) | 0) + d) | 0;
		d = (d + 1) | 0;
		a = b ^ (b >>> 9);
		b = (c + (c << 3)) | 0;
		c = (c << 21) | (c >>> 11);
		c = (c + t) | 0;
		return t >>> 0;
	};
}

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
		const data = await Users.find({ email: req.body.email });

		if (!data.length) {
			res.sendStatus(401);
			return;
		}
		try {
			await bcrypt.compare(req.body.password, data[0]["password"]);

			const token = jwt.sign({ user: data[0] }, process.env.key, {
				expiresIn: "1 hour",
			});

			res.cookie("jwt", token, {
				httpOnly: true,
				//sameSite: "Strict",
				//secure: true,
				signed: true,
				partitioned: true,
			}).send();
		} catch (error) {
			console.error("login failed:", error.message);
			res.sendStatus(500);
		}
	}
});

router.get("/read", (req, res, next) => {
	if (jwt.decode(req.signedCookies["jwt"])) {
		res.json(jwt.decode(req.signedCookies["jwt"])["user"]);
	} else {
		res.sendStatus(401);
	}
});

router.get("/day", (req, res, next) => {
	if (jwt.decode(req.signedCookies["jwt"])) {
		const user = jwt.decode(req.signedCookies["jwt"])["user"];
		var now = new Date();
		res.json(
			sfc32(
				user.seed,
				now.getDay(),
				now.getMonth(),
				now.getFullYear()
			)() % 2
		);
	} else {
		res.sendStatus(401);
	}
});

router.get("/clear", async (req, res, next) => {
	res.clearCookie("jwt").end();
});

export default router;
