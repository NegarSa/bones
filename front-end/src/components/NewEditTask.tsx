import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Task from "../utils/taskInterface";

import { useMutation } from "@tanstack/react-query";
import { taskNew, taskEditAll } from "@/utils/apiEndpoints";
import { FormEvent } from "react";

export default function NewEditTask(varient: "new" | "edit", task?: Task) {
	let mutatefn;
	if (varient === "new") {
		mutatefn = (task: Task) => taskNew(task);
	} else {
		mutatefn = (task: Task) => taskEditAll(task._id, task);
	}
	const taskMutation = useMutation({ mutationFn: mutatefn });

	function handleClick(formData) {
		const newTask = {
			action: formData.get("action") as string,
			type_of_day: formData.get("type_of_day") as string,
		} as Task;
		taskMutation.mutate(newTask);
	}
	return (
		<DialogContent className="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>
					{varient === "edit" ? "Edit" : "Create new"} task
				</DialogTitle>
				<DialogDescription></DialogDescription>
			</DialogHeader>
			<div className="grid gap-4 py-4">
				<form
					action={handleClick}
					id="form-task"
				>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label
							htmlFor="action"
							className="text-right"
						>
							Action
						</Label>
						<Input
							id="action"
							defaultValue={
								varient === "edit" ? task?.action : ""
							}
							className="col-span-3"
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label
							htmlFor="type"
							className="text-right"
						>
							Type of day
						</Label>
						<Input
							id="type"
							defaultValue=""
							className="col-span-3"
						/>
					</div>
				</form>
			</div>
			<DialogFooter>
				<Button
					form="form-task"
					type="submit"
					value="submit"
					onClick={handleClick}
				>
					{taskMutation.isPending ? "hold" : "Save"}
				</Button>
			</DialogFooter>
		</DialogContent>
	);
}
