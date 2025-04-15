import { ColumnDef } from "@tanstack/react-table";
import Task from "../utils/taskInterface";
import TaskBox from "./Task";
import { ArrowUpDown } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

import { ChevronDown, ChevronRight } from "lucide-react";
import TaskActions from "./TaskActions";
export const columns: ColumnDef<Task>[] = [
	{
		id: "expander",
		enableHiding: false,
		header: "",
		cell: ({ row }) => (
			<Button
				variant="ghost"
				size="icon"
				onClick={() => {
					row.toggleExpanded();
				}}
				disabled={row.original.subtasks.length === 0}
			>
				{row.getIsExpanded() ? (
					<ChevronDown size={16} />
				) : (
					<ChevronRight size={16} />
				)}
			</Button>
		),
	},
	{
		id: "subtasks",
		enableHiding: true,
		header: ({ column }) => {
			return (
				<Button
					className="-ml-3"
					variant="ghost"
					onClick={() => {
						column.toggleSorting(column.getIsSorted() === "asc");
					}}
				>
					Subtasks
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return row.original.subtasks.length;
		},
	},
	{
		accessorKey: "action",
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
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			return <TaskBox {...row.original} />;
		},
	},
	{
		accessorKey: "type_of_day",

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
		accessorKey: "description",

		header: ({ column }) => {
			return (
				<Button
					className="-ml-3"
					variant="ghost"
					onClick={() => {
						column.toggleSorting(column.getIsSorted() === "asc");
					}}
				>
					Description
					<ArrowUpDown />
				</Button>
			);
		},
	},
	{
		accessorKey: "deadline",
		header: ({ column }) => {
			return (
				<Button
					className="-ml-3"
					variant="ghost"
					onClick={() => {
						column.toggleSorting(column.getIsSorted() === "asc");
					}}
				>
					Deadline
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => {
			return (
				<div>
					{row.original.deadline
						? format(row.original.deadline, "PPP")
						: "No deadline"}
				</div>
			);
		},
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => {
			const task = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<TaskActions
								taskId={task._id}
								action="delete"
							/>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<Link to={"/task/" + task._id}>
							<DropdownMenuItem>View details</DropdownMenuItem>
						</Link>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
