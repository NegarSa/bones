import { Router } from "express";
const router = Router();
import Users from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function Alea(seed) {
	if (seed === undefined) {
		seed = +new Date() + Math.random();
	}
	function Mash() {
		var n = 4022871197;
		return function (r) {
			for (var f, t, s, u = 0, e = 0.02519603282416938; u < r.length; u++)
				(s = r.charCodeAt(u)),
					(f = e * (n += s) - ((n * e) | 0)),
					(n =
						4294967296 * ((t = f * ((e * n) | 0)) - (t | 0)) +
						(t | 0));
			return (n | 0) * 2.3283064365386963e-10;
		};
	}

	var m = Mash(),
		a = m(" "),
		b = m(" "),
		c = m(" "),
		x = 1,
		y;
	(seed = seed.toString()), (a -= m(seed)), (b -= m(seed)), (c -= m(seed));
	a < 0 && a++, b < 0 && b++, c < 0 && c++;
	return function () {
		var y = x * 2.3283064365386963e-10 + a * 2091639;
		(a = b), (b = c);
		return (c = y - (x = y | 0));
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
		res.json(jwt.decode(req.signedCookies["jwt"]));
	} else {
		res.sendStatus(401);
	}
});

router.get("/day", (req, res, next) => {
	if (jwt.decode(req.signedCookies["jwt"])) {
		const user = jwt.decode(req.signedCookies["jwt"])["user"];
		const now = new Date();
		res.json(
			Alea(
				now.getDay * 10000 +
					now.getMonth() * 10000 +
					now.getFullYear() +
					user.seed
			) *
				6 >
				user.frequency
				? 1
				: 0
		);
	} else {
		res.sendStatus(401);
	}
});

router.get("/clear", async (req, res, next) => {
	res.clearCookie("jwt").end();
});

router.put("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;

		const event = await Users.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (!event) {
			return res.status(400).json({
				message: "User not found",
			});
		}
		res.json(event);
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		await Users.findByIdAndDelete(id);
		res.status(200).send();
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
});

export default router;
