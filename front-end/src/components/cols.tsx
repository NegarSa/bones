import { ColumnDef } from "@tanstack/react-table";
import Task from "../utils/taskInterface";
import TaskBox from "./Task";
import { ArrowUpDown } from "lucide-react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns: ColumnDef<Task>[] = [
	{
		accessorKey: "task",
		enableHiding: false,
		header: ({ column }) => {
			return (
				<Button
					className="-ml-3"
					variant="ghost"
					onClick={() => {
						column.toggleSorting(column.getIsSorted() === "asc");
					}}
				>
					Task
					<ArrowUpDown className="-mr-5 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return <TaskBox {...row.original} />;
		},
	},
	{
		accessorKey: "type_of_day",
		size: 15,
		header: ({ column }) => {
			return (
				<Button
					className="-ml-3"
					variant="ghost"
					onClick={() => {
						column.toggleSorting(column.getIsSorted() === "asc");
					}}
				>
					Type of Day
					<ArrowUpDown />
				</Button>
			);
		},
	},
	{
		id: "actions",
		enableHiding: false,
		size: 5,
		maxSize: 5,
		cell: ({ row }) => {
			const task = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="h-8 w-8 p-0"
						>
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							Delete task {task.action}
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>View details</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
