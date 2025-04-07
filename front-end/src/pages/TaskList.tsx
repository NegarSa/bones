import { DataTable } from "@/components/TaskTable";

import { useQuery } from "@tanstack/react-query";
import { taskGetAll } from "../utils/apiEndpoints";
import { columns } from "../components/cols";

import "../styles/table.css";
export default function TaskList() {
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
		<div className="tasklist-page">
			<div className="table-wrapper">
				<DataTable
					data={tasksQuery.data}
					columns={columns}
				/>
			</div>
		</div>
	);
}
{
	/* <TableCell>
									<TaskBox {...task} />
								</TableCell> */
}
