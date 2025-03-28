import Tasks from "../models/tasks";
import authenticate from "./auth";
import { Request, Response } from "express";
import { handleError } from "./utils";

export async function get_all_tasks_for_user(
	req: Request,
	res: Response
): Promise<void> {
	const user = authenticate(req);
	if (user === null) {
		return handleError(res, Error("not logged in"), 401);
	}
	try {
		const data = await Tasks.find({ user: user._id });
		res.json(data);
		return;
	} catch {
		(error: Error) => handleError(res, error, 500);
	}
}

export async function get_all_tasks_for_user_type_of_day(
	req: Request,
	res: Response
): Promise<void> {
	const user = authenticate(req);
	if (user === null) {
		return handleError(res, Error("not logged in"), 401);
	}
	try {
		if (req.body === null || req.body["type_of_day"] === null) {
			return handleError(res, Error("no type of day provided"), 400);
		} else {
			const data = await Tasks.find({
				user: user._id,
				type_of_day: req.body["type_of_day"],
			});
			res.json(data);
			return;
		}
	} catch {
		(error: Error) => handleError(res, error, 500);
	}
}

export async function new_task(req: Request, res: Response): Promise<void> {
	const user = authenticate(req);
	if (user === null) {
		return handleError(res, Error("not logged in"), 401);
	}
	if (req.body === null || req.body["action"] === null) {
		return handleError(
			res,
			Error("parameters are not complete for creation of the task"),
			400
		);
	}
	try {
		const data = Tasks.create({ ...req.body, user: user._id });
		res.json(data);
		return;
	} catch {
		(error: Error) => handleError(res, error, 500);
	}
}

export async function edit_task(req: Request, res: Response): Promise<void> {
	const { id } = req.params;
	const user = authenticate(req);
	if (user === null) {
		return handleError(res, Error("not logged in"), 401);
	}
	if (req.body === null || id !== user._id) {
		return handleError(res, Error("parameters are not complete"), 400);
	}
	try {
		const task = await Tasks.findById(id);
		if (task === null) {
			return handleError(res, Error("task not found"), 404);
		}
		if (task.user.toString() === user._id) {
			const event = await Tasks.findByIdAndUpdate(id, req.body, {
				new: true,
			});
			res.json(event).send();
			return;
		} else {
			return handleError(
				res,
				Error("you don't have access to this task"),
				401
			);
		}
	} catch {
		(error: Error) => handleError(res, error, 500);
	}
}

export async function delete_task(req: Request, res: Response): Promise<void> {
	const { id } = req.params;
	const user = authenticate(req);
	if (user === null) {
		return handleError(res, Error("not logged in"), 401);
	}
	if (req.body === null) {
		return handleError(res, Error("parameters are not complete"), 400);
	}
	try {
		const task = await Tasks.findById(id);
		if (task === null) {
			return handleError(res, Error("task not found"), 404);
		}
		if (task.user.toString() === user._id) {
			await Tasks.findByIdAndDelete(id);
			return;
		} else {
			return handleError(
				res,
				Error("you don't have access to this task"),
				401
			);
		}
	} catch {
		(error: Error) => handleError(res, error, 500);
	}
}
