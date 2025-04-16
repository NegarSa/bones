export interface Subtask {
	action: string;
	status: boolean;
}

export default interface Task {
	_id: string;
	action: string;
	description: string;
	createdAt: Date;
	deadline?: Date;
	status: boolean;
	subtasks: Subtask[];
	type_of_day: "bones" | "no bones" | "both";
}
