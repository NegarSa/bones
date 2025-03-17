import Tasks from "../models/tasks.js";

async function get_all_tasks_for_user(req: Request, res: Response){
    const user = authenticate();
    try {
        const data = await Tasks.find({ user: user._id });
        res.json(data);
    } catch {
        (error) => console.error(error);
        res.status(500).send();
    }
}

async function get_all_tasks_for_user_type_of_day(req: Request, res: Response){
    const user = authenticate();
    try {
        if (req.body === null || req.body['type_of_day'] === null){
            return res.status(500).send();
        }
        const data = await Tasks.find({ user: user._id, type_of_day: req.body['type_of_day'] });
        return res.json(data);
    } catch {
        (error: Error) => {console.error(error);
        return res.status(500).send();}
    }
}

async function new_task(req, res) {
	if (req.body.action) {
		Tasks.create(req.body)
			.then((data) => res.json(data));
	} else {
		res.json({
			error: "The input field is empty",
			stuff: req.body,
		});
	}
}