import { useQuery } from "@tanstack/react-query";
import { taskRemove } from "../utils/apiEndpoints";

export function useDeleteTask(id: string) {
	return useQuery({
		queryKey: ["deleteTask", id],
		queryFn: () => taskRemove(id),
	});
}
