import { ColumnDef } from "@tanstack/react-table";
import Task from "../utils/taskInterface";

export const columns: ColumnDef<Task>[] = [
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "action",
		header: "Action",
	},
	{
		accessorKey: "type",
		header: "Type of day",
	},
];
