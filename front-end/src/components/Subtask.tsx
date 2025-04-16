import "../styles/task.css";
import Task, { Subtask } from "../utils/taskInterface";
import { useMutation } from "@tanstack/react-query";
import { taskEdit } from "@/utils/apiEndpoints";
import { ChangeEvent } from "react";

interface propsType {
	task: Task;
	subtask: Subtask;
}
export default function SubTaskBox(props: propsType) {
	const { task, subtask } = props;
	const taskStatusMutation = useMutation({
		mutationFn: (data: Task) => taskEdit(task._id, data),
	});
	function handlecheck(event: ChangeEvent<HTMLInputElement>) {
		const updatedSubtasks = task.subtasks.map((st) =>
			st.action === subtask.action
				? { ...st, status: event.target.checked }
				: st
		);
		taskStatusMutation.mutate({ ...task, subtasks: updatedSubtasks });
	}
	return (
		<div className="task-box">
			<div className="checkbox-wrapper">
				<label
					htmlFor={task._id + subtask.action}
					className="item"
				>
					<input
						className="hidden"
						type="checkbox"
						id={task._id + subtask.action}
						onChange={handlecheck}
						defaultChecked={subtask.status}
					/>
					<label
						htmlFor={task._id + subtask.action}
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
						htmlFor={task._id + subtask.action}
						className="cbx-lbl"
					>
						{subtask.action}
					</label>
				</label>
			</div>
		</div>
	);
}
