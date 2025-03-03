import { Router } from "express";
const router = Router();
import Tasks from "../models/tasks.js";

router.get("/tasks", (req, res, next) => {
	Tasks.find({})
		.then((data) => res.json(data))
		.catch(next);
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

export default router;
