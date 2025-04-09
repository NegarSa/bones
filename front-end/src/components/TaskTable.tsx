import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	SortingState,
	getSortedRowModel,
	VisibilityState,
	ColumnFiltersState,
	getFilteredRowModel,
	RowPinningState,
} from "@tanstack/react-table";
import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarPlus } from "lucide-react";
import NewEditTask from "./NewEditTask";
import { Link } from "react-router";
import TaskBox from "./Task";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
		{}
	);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [rowPinning, setRowPinning] = useState<RowPinningState>({
		top: [],
		bottom: [],
	});
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onRowPinningChange: setRowPinning,
		state: {
			sorting,
			columnVisibility,
			columnFilters,
			rowPinning,
		},
	});

	return (
		<div className="table-wrapper">
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter tasks..."
					value={
						(table.getColumn("task")?.getFilterValue() as string) ??
						""
					}
					onChange={(event) =>
						table
							.getColumn("task")
							?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="outline"
							className="ml-auto"
						>
							Columns
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) => {
											column.toggleVisibility(!!value);
										}}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
				<Link to="/newtask">
					<Button
						variant="outline"
						size="icon"
					>
						<CalendarPlus />
					</Button>
				</Link>
				{/* <Dialog
					open={dialogOpen}
					onOpenChange={setDialogOpen}
				>
					<DialogTrigger asChild>
						<Button
							variant="outline"
							size="icon"
						>
							<CalendarPlus />
						</Button>
					</DialogTrigger>
					<NewEditTask
						dialogClose={setDialogOpen}
						variant={true}
					/>
				</Dialog> */}
			</div>

			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.header,
													header.getContext()
											  )}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.length ? (
						table.getRowModel().rows.map((row) => (
							<Collapsible
								key={row.id + "c"}
								asChild
							>
								<>
									<CollapsibleTrigger asChild>
										<TableRow key={row.id}>
											{row
												.getVisibleCells()
												.map((cell) => (
													<TableCell key={cell.id}>
														{flexRender(
															cell.column
																.columnDef.cell,
															cell.getContext()
														)}
													</TableCell>
												))}
										</TableRow>
									</CollapsibleTrigger>
									<CollapsibleContent asChild>
										{row.original.subtasks.map(
											(subtask) => (
												<TaskBox
													key={subtask._id}
													task={subtask}
												/>
											)
										)}
									</CollapsibleContent>
								</>
							</Collapsible>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="h-24 text-center"
							>
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
