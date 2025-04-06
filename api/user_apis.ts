import { Request, Response } from "express";
import Users from "../models/users";
import authenticate from "./auth";
import { handleError, Alea } from "./utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function newUser(req: Request, res: Response): Promise<void> {
	if (req.body.username && req.body.email && req.body.password) {
		try {
			const data = await Users.find({ email: req.body.email });
			if (data.length) {
				return handleError(res, Error("email already exists"), 400);
			}
		} catch {
			(error: Error) => handleError(res, error, 500);
			return;
		}
		try {
			const newU = await Users.create(req.body);
			console.log("User registered");
			res.status(200).send();
			return;
		} catch {
			(error: Error) => handleError(res, error, 500);
		}
	}
}

export async function login(req: Request, res: Response): Promise<void> {
	if (req.body.email && req.body.password) {
		const data = await Users.find({ email: req.body.email });

		if (!data.length) {
			return handleError(res, Error("email does not exist"), 404);
		}
		try {
			const comparePasswords = await bcrypt.compare(
				req.body.password,
				data[0]["password"]
			);
			if (!comparePasswords) {
				return handleError(
					res,
					Error("Wrong username or password"),
					401
				);
			}

			let token;
			try {
				token = jwt.sign(
					{
						user: {
							_id: data[0]["_id"]?.toString(),
							username: data[0]["username"],
							email: data[0]["email"],
							seed: data[0]["seed"],
							frequency: data[0]["frequency"],
						},
					},
					process.env.key!,
					{
						expiresIn: "1 hour",
					}
				);
			} catch {
				(error: Error) => handleError(res, error, 500);
				return;
			}

			res.cookie("jwt", token, {
				httpOnly: true,
				//sameSite: "Strict",
				//secure: true,
				signed: true,
				partitioned: true,
			});
			res.send();

			return;
		} catch (error) {
			(error: Error) => handleError(res, error, 500);
		}
	}
}

export function clearUserCookie(req: Request, res: Response): void {
	res.clearCookie("token").end();
	return;
}

export function readUserDetailsFromCookie(req: Request, res: Response): void {
	const user = authenticate(req);
	res.json(user);
	return;
}

export async function deleteUser(req: Request, res: Response): Promise<void> {
	const { id } = req.params;
	const user = authenticate(req);
	if (user === null || id !== user._id) {
		return handleError(res, Error("not authorized"), 401);
	}
	if (req.body === null) {
		return handleError(res, Error("parameters are not complete"), 400);
	}
	try {
		await Users.findByIdAndDelete(id);
		res.status(200).send();
		return;
	} catch (error: any) {
		handleError(res, error, 500);
	}
}
export async function editUser(req: Request, res: Response): Promise<void> {
	const { id } = req.params;
	const user = authenticate(req);
	if (user === null || id !== user._id) {
		return handleError(res, Error("not authorized"), 401);
	}
	if (req.body === null) {
		return handleError(res, Error("parameters are not complete"), 400);
	}
	try {
		const event = await Users.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (!event) {
			res.status(400).json({
				message: "User not found",
			});
		}
		res.json(event).send();
		return;
	} catch (error: any) {
		handleError(res, error, 500);
	}
}

export async function getAllUsers(req: Request, res: Response): Promise<void> {
	try {
		const data = Users.find({}, ["username"]);
		res.json(data);
		return;
	} catch (error: any) {
		handleError(res, error, 500);
		return;
	}
}

export async function getTypeOfDayForUser(req: Request, res: Response) {
	const user = authenticate(req);
	if (user === null) {
		return handleError(res, Error("not authorized"), 401);
	}
	try {
		const now = new Date();
		const input =
			now.getDay() * 1000 +
			now.getMonth() * 10000 +
			now.getFullYear() +
			user.seed;
		const temp = Alea(input.toString())() * 6 > user.frequency ? 1 : 0;
		res.json({ type_of_day: temp });
	} catch (error: any) {
		handleError(res, error, 500);
		return;
	}
}
