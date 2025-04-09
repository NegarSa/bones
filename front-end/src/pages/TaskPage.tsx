import { Link, useParams, useNavigate } from "react-router";
import TaskForm from "@/components/TaskForm";
import { useQuery } from "@tanstack/react-query";
import { taskGetOne } from "@/utils/apiEndpoints";

export default function TaskPage() {
	const { id } = useParams();
	const taskQuery = useQuery({
		queryKey: ["single-task-query", id],
		queryFn: () => taskGetOne(id!),
	});
	if (taskQuery.isError) return <>hi sorry something went wrong</>;
	if (taskQuery.isPending) return <>hi sorry wait</>;
	return (
		<>
			<TaskForm
				variant={false}
				task={taskQuery.data}
			/>
		</>
	);
}
