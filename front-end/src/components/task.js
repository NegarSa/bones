import "../styles/task.css";
export default function Task(props) {
	const task = props.task;
	function handlecheck(event) {}
	return (
		<div className="task-box">
			<div className="checkbox-wrapper">
				<label
					for={task._id}
					className="item"
				>
					<input
						className="hidden"
						type="checkbox"
						id={task._id}
						onChange={handlecheck}
					/>
					<label
						for={task._id}
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
						for={task._id}
						className="cbx-lbl"
					>
						{task.action}
					</label>
				</label>
			</div>
			<span className="details">Date: {task.date_created}</span>
		</div>
	);
}
