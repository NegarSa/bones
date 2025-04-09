import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Task from "../utils/taskInterface";
import TaskForm from "./TaskForm";

interface propsType {
	variant: boolean;
	task?: Task;
	dialogClose?: Function;
}
export default function NewEditTask(props: propsType) {
	const { variant, task, dialogClose } = props;
	return (
		<DialogContent className="sm:max-w-[425px]">
			<DialogHeader>
				<DialogTitle>
					{!variant ? "Edit" : "Create new"} task
				</DialogTitle>
				<DialogDescription></DialogDescription>
			</DialogHeader>
			<div className="grid gap-4 py-4">
				{variant ? (
					<TaskForm
						dialogClose={dialogClose}
						variant={true}
					/>
				) : (
					<TaskForm
						dialogClose={dialogClose}
						variant={false}
						task={task}
					/>
				)}
			</div>
			<DialogFooter></DialogFooter>
		</DialogContent>
	);
}
