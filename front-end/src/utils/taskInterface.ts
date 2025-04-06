export default interface Task {
	_id: string;
	action: string;
	description: string;
	createdAt: Date;
	deadline?: Date;
	status: boolean;
	type_of_day: string;
	subtasks: [Task];
}
