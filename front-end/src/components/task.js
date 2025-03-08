import { Link } from "react-router-dom";
import "../styles/task.css";
import axios from "axios";

export default function Task(props) {
	let task = props.task;

	function typeChange(event) {
		axios
			.put("/api/tasks/" + task._id, {
				type_of_day: event.target.checked ? "bones" : "no bones",
			})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => console.log(error));
	}

	function handlecheck(event) {
		axios
			.put("/api/tasks/" + task._id, {
				status: event.target.checked,
			})
			.then((response) => {
				console.log(response);
			})
			.catch((error) => console.log(error));
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
			<div className="details-wr">
				<div className="details"></div>
				<div className="checkbox-wrapper-10">
					<input
						className="tgl tgl-flip"
						id={task._id + "bones"}
						type="checkbox"
						onChange={typeChange}
						defaultChecked={task.type_of_day === "bones" ? 1 : 0}
					/>
					<label
						className="tgl-btn"
						data-tg-off="bones"
						data-tg-on="bones"
						htmlFor={task._id + "bones"}
					></label>
				</div>
				<Link to={"/task/" + task._id}>
					<button className={"update"}>Update</button>
				</Link>
			</div>
		</div>
	);
}
