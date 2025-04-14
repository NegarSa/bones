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
	getExpandedRowModel,
} from "@tanstack/react-table";
import { useState, Fragment } from "react";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarPlus } from "lucide-react";
import NewEditTask from "./NewEditTask";
import Task from "../utils/taskInterface";
import { Link } from "react-router";
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
	const [expanded, setExpanded] = useState({});

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
		getExpandedRowModel: getExpandedRowModel(),
		onExpandedChange: setExpanded,
		state: {
			sorting,
			columnVisibility,
			columnFilters,
			rowPinning,
			expanded,
		},
	});

	return (
		<div className="table-wrapper">
			<div className="flex items-center py-4">
				<Input
					placeholder="Filter tasks..."
					value={
						(table
							.getColumn("action")
							?.getFilterValue() as string) ?? ""
					}
					onChange={(event) =>
						table
							.getColumn("action")
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
						<CalendarPlus color="red" />
					</Button>
				</Link>
				<Dialog
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
				</Dialog>
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
							<Fragment key={row.id}>
								<TableRow>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>

								{row.getIsExpanded() &&
								row.original.subtasks.length > 0 ? (
									<TableRow
										key={row.id.toString() + "subtask"}
									>
										<TableCell colSpan={columns.length + 1}>
											<div className="pl-20 border-l-2 border-gray-300">
												<ul className="list-disc">
													{row.original.subtasks.map(
														(
															subtask: string,
															index: number
														) => (
															<li
																key={
																	index.toString() +
																	row.id.toString() +
																	"subtask"
																}
																className="py-1"
															>
																{subtask}
															</li>
														)
													)}
												</ul>
											</div>
										</TableCell>
									</TableRow>
								) : null}
							</Fragment>
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
