import { useAuth } from "@/hooks/useAuth";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { taskGetAll } from "../utils/apiEndpoints";

export default function TaskList() {
	const auth = useAuth();
	const tasksQuery = useQuery({
		queryKey: ["getTasks"],
		queryFn: taskGetAll,
	});
	if (tasksQuery.isError) {
		return <div> sorry something went wrong bye</div>;
	}
	if (tasksQuery.isPending) {
		return <div> sorry wait</div>;
	}
	return (
		<div className="w-full sm:p-4">
			<h2 className="p-4">All Tasks</h2>
			<div className="rounded-md sm:border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="font-medium">
								Action
							</TableHead>
							<TableHead className="font-medium">
								Status
							</TableHead>
							<TableHead className="font-medium">
								Type of day
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{tasksQuery.data.map((task) => (
							<TableRow key={task._id}>
								<TableCell>{task.action}</TableCell>
								<TableCell>{task.status}</TableCell>
								<TableCell>{task.type_of_day}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
