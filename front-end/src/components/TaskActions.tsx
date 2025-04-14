import { taskRemove } from "@/utils/apiEndpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

export default function TaskActions({
	taskId,
	action,
	className,
}: {
	taskId: string;
	action: string;
	className?: string;
}) {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const deleteTaskMutation = useMutation({
		mutationFn: taskRemove,
		onSuccess: () => {
			queryClient.invalidateQueries(["getTasks"]); // Refresh task list
		},
		onError: (error) => {
			console.error("Failed to delete task:", error);
			queryClient.invalidateQueries(["getTasks"]);
		},
	});

	const handleDelete = async () => {
		deleteTaskMutation.mutate(taskId);
		if (action === "delete-page") {
			await navigate("/", { replace: true });
		}
	};

	return (
		<Button
			variant="destructive"
			className={className}
			onClick={() => {
				void handleDelete();
			}}
			disabled={deleteTaskMutation.isLoading}
		>
			{deleteTaskMutation.isLoading ? "Deleting..." : "Delete Task"}
		</Button>
	);
}
