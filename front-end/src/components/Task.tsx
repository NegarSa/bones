import "../styles/task.css";
import Task from "../utils/taskInterface";
import { useMutation } from "@tanstack/react-query";
import { taskEdit } from "@/utils/apiEndpoints";
import { ChangeEvent } from "react";

export default function TaskBox(task: Task) {
	const taskStatusMutation = useMutation({
		mutationFn: (data: { status: boolean }) => taskEdit(task._id, data),
	});
	function handlecheck(event: ChangeEvent<HTMLInputElement>) {
		taskStatusMutation.mutate({ status: event.target.checked });
	}
	return (
		<div className="task-box">
			<div className="checkbox-wrapper">
				<label
					htmlFor={task._id}
					className="item"
				>
					<input
						className="hidden"
						type="checkbox"
						id={task._id}
						onChange={handlecheck}
						defaultChecked={task.status}
					/>
					<label
						htmlFor={task._id}
						className="cbx"
					>
						<svg
							width="12px"
							height="12px"
							viewBox="0 0 14 12"
						>
							<polyline points="1 7.6 5 11 13 1"></polyline>
						</svg>
					</label>
					<label
						htmlFor={task._id}
						className="cbx-lbl"
					>
						{task.action}
					</label>
				</label>
			</div>
		</div>
	);
}
