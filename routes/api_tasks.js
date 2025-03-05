import { Router } from "express";
const router = Router();
import Tasks from "../models/tasks.js";
import jwt from "jsonwebtoken";

router.get("/tasks", async (req, res, next) => {
	if (jwt.decode(req.signedCookies["jwt"])) {
		const u_id = jwt.decode(req.signedCookies["jwt"])["user"]._id;
		try {
			const data = await Tasks.find({ user: u_id });
			res.json(data);
		} catch {
			(error) => console.error(error);
			res.status(500).send();
		}
	} else {
		res.sendStatus(401);
	}
});

router.get("/bones", (req, res, next) => {
	Tasks.find({ type_of_day: "bones" }, ["action", "status", "type_of_day"])
		.then((data) => res.json(data))
		.catch(next);
});

router.get("/nobones", (req, res, next) => {
	Tasks.find({ type_of_day: "no bones" }, ["action", "status", "type_of_day"])
		.then((data) => res.json(data))
		.catch(next);
});

router.post("/tasks", (req, res, next) => {
	if (req.body.action) {
		Tasks.create(req.body)
			.then((data) => res.json(data))
			.catch(next);
	} else {
		res.json({
			error: "The input field is empty",
			stuff: req.body,
		});
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		Tasks.find({ _id: id })
			.then((data) => res.json(data))
			.catch(next);
	} catch {
		(error) => {
			console.log(error);
		};
	}
});

router.put("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;

		const event = await Tasks.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (!event) {
			return res.status(400).json({
				message: "Event not found",
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
		await Tasks.findByIdAndDelete(id);
		res.status(200).send();
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
});

export default router;
