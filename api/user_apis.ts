import { Request, Response } from 'express';
import Users from "../models/users.js";
import authenticate from "./auth.js";

const handleError = (res: Response, error: Error) => {
    console.error(error);
    res.status(500).json({ error: error.message });
};

export function clear_user_cookie(req: Request, res: Response): void{
    res.clearCookie("jwt").end();
    return;
}

export function read_user_details_from_cookie(req: Request, res: Response){
    const user = authenticate(req);
    return user;
}

export async function delete_user(req: Request, res: Response): Promise<void>{
    const { id } = req.params;
    const user = authenticate(req);
    if (user === null){
        res.status(401).send();
        return;
    }
    if (req.body === null || id !== user._id){
        res.status(400).send();
        return;
    }
    try {
        await Users.findByIdAndDelete(id);
		res.status(200).send();
        return;
    } catch (error: any) {
        handleError(res, error)
        return;
    }
}
export async function edit_user(req: Request, res: Response): Promise<void>{
    const { id } = req.params;
    const user = authenticate(req);
    if (user === null){
        res.status(401).send(); 
        return;
    }
    if (req.body === null || id !== user._id){
        res.status(400).send();
        return;
    }
    try {
        const event = await Users.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (!event) {
			res.status(400).json({
				message: "User not found",
			})
		}
		res.json(event).send();
        return;
    } catch (error: any) {
        handleError(res, error)
        return;
    }
}

export async function get_all_users(req: Request, res: Response): Promise<void>{
    try {
        const data = Users.find({}, ['username'])
		res.json(data)
        return;
    } catch (error: any) {
        handleError(res, error)
        return;
    }
}

