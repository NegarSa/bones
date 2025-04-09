import TaskForm from "@/components/TaskForm";
export default function NewTask({ setDialogOpen }) {
	return (
		<TaskForm
			variant={true}
			dialogClose={setDialogOpen}
		/>
	);
}
