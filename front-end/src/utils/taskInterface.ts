export default interface Task {
	_id: string;
	action: string;
	description: string;
	createdAt: Date;
	deadline?: Date;
	status: boolean;
	subtasks: [string];
	type_of_day: "bones" | "no bones" | "both";
}
