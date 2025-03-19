import Tasks from "../models/tasks.js";
import authenticate from "./auth.js";
import { Request, Response } from 'express';


export async function get_all_tasks_for_user(req: Request, res: Response): Promise<void>{
    const user = authenticate(req);
    if (user === null){
        res.status(401).send();
        return;
    }
    try {
        const data = await Tasks.find({ user: user._id });
        res.json(data);
        return;
    } catch {
        (error: Error) => {console.error(error);
        res.status(500).send();}
        return;
    }
}

export async function get_all_tasks_for_user_type_of_day(req: Request, res: Response): Promise<void>{
    const user = authenticate(req);
    if (user === null){
        res.status(401).send();
        return;
    }
    try {
        if (req.body === null || req.body['type_of_day'] === null){
            res.status(400).send();
            return;
        }
        else {
            const data = await Tasks.find({ user: user._id, type_of_day: req.body['type_of_day'] });
            res.json(data);
            return;
        }
    } catch {
        res.status(400).send();
        return;
    }
}

export async function new_task(req: Request, res: Response): Promise<void>{
    const user = authenticate(req);
    if (user === null){
        res.status(401).send();
        return;
    }
    if (req.body === null || req.body['action'] === null){
        res.status(400).send();
        return;
    }
    try {
        const data = Tasks.create({...req.body, user: user._id});
        res.json(data);
        return;
    } catch {
        (error: Error) => {console.error(error);
        res.status(500).send();}
        return;
    }
}

export async function edit_task(req: Request, res: Response): Promise<void>{
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
        const event = await Tasks.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (!event) {
			res.status(400).json({
				message: "Event not found",
			})
		}
		res.json(event).send();
        return;
    } catch (error: any) {
        res.status(500).json({
			error: error.message,
		}).send();
        return;
    }
}

export async function delete_task(req: Request, res: Response): Promise<void>{
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
        await Tasks.findByIdAndDelete(id);
        return;
    } catch (error: any) {
        res.status(500).json({
			error: error.message,
		}).send();
        return;
    }
}