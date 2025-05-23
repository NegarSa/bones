import { useForm, useFieldArray } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import Task from "../utils/taskInterface";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { taskNew, taskEditAll } from "@/utils/apiEndpoints";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Plus, Minus } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import TaskActions from "./TaskActions";
const taskSchema = z.object({
	action: z.string().min(1, "Task action is required"),
	type_of_day: z.string(),
	description: z.string().nullable(),
	deadline: z.date().nullable(),
	subtasks: z.array(
		z.object({
			action: z.string().min(1, "Task action is required"),
		})
	),
});
interface propsType {
	variant: boolean;
	task?: Task;
	dialogClose?: (value: boolean) => void;
}

export default function TaskForm(props: propsType) {
	const { variant, task, dialogClose } = props;
	const queryClient = useQueryClient();
	const nav = useNavigate();
	const taskMutation = useMutation({
		mutationFn: (data: Task) => taskNew(data),
		onError: () => {
			alert(taskMutation.error);
		},
		onSuccess: async () => {
			if (dialogClose) dialogClose(false);
			else {
				await nav("/");
			}
			return queryClient.invalidateQueries({ queryKey: ["getTasks"] });
		},
	});
	const taskMutationEdit = useMutation({
		mutationFn: (data: Task) => {
			if (!task) {
				throw new Error("Task is undefined");
			}
			return taskEditAll(task._id, data);
		},
		onSuccess: async () => {
			if (dialogClose) dialogClose(false);
			else {
				await nav("/");
			}
			return queryClient.invalidateQueries({ queryKey: ["getTasks"] });
		},
		onError: () => {
			alert(taskMutationEdit.error);
		},
	});

	const form = useForm<z.infer<typeof taskSchema>>({
		resolver: zodResolver(taskSchema),
		defaultValues: {
			action: variant ? "" : task?.action,
			type_of_day: variant ? "bones" : task?.type_of_day,
			description: variant ? "" : task?.description,
			deadline: variant ? null : task?.deadline,
			subtasks: variant
				? []
				: task?.subtasks.map((subtask) => {
						return { action: subtask.action };
				  }),
		},
	});
	const { fields, append, remove } = useFieldArray({
		name: "subtasks",
		control: form.control,
	});

	function onSubmit(data: z.infer<typeof taskSchema>) {
		const finalMutation = variant ? taskMutation : taskMutationEdit;
		console.log(data);
		finalMutation.mutate({
			action: data.action,
			description: data.description,
			type_of_day: data.type_of_day,
			deadline: data.deadline,
			subtasks: data.subtasks,
		} as Task);
	}

	return (
		<div className="flex flex-col items-center justify-center float-center object-center">
			<Form {...form}>
				<form
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col p-10 space-y-3 "
					id="form-task"
				>
					<div className="flex items-center justify-between">
						<FormField
							control={form.control}
							name="action"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Task</FormLabel>
									<FormControl>
										<Input
											className="mr-4 pr-5 grow"
											placeholder=""
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="type_of_day"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Type of day</FormLabel>
									<FormControl>
										<select
											className="border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
											{...field}
										>
											<option value="bones">Bones</option>
											<option value="no-bones">
												No bones
											</option>
											<option value="both">Both</option>
										</select>
									</FormControl>
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										value={field.value ?? ""}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="deadline"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Deadline</FormLabel>
								<FormControl>
									<Popover modal={true}>
										<PopoverTrigger asChild>
											<Button
												variant={"outline"}
												className={cn(
													"bg-transparent justify-start text-left font-normal",
													!field.value &&
														"text-muted-foreground"
												)}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Pick a date</span>
												)}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0">
											<Calendar
												mode="single"
												selected={
													field.value ?? undefined
												}
												onSelect={field.onChange}
											/>
										</PopoverContent>
									</Popover>
								</FormControl>
							</FormItem>
						)}
					/>

					<div className="flex items-center justify-between">
						<FormLabel>Subtasks:</FormLabel>
						<Button
							type="button"
							size="icon"
							variant="outline"
							className="bg-transparent border-none"
							onClick={() => {
								append({ action: "" });
							}}
						>
							<Plus />
						</Button>
					</div>
					{fields.map((field, index) => (
						<div
							className="ml-10 flex items-center justify-between"
							key={field.id}
						>
							<Input
								placeholder="Description"
								// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
								{...form.register(`subtasks.${index}.action`)}
							/>
							<Button
								className="ml-2"
								type="button"
								variant="destructive"
								onClick={() => {
									remove(index);
								}}
							>
								<Minus />
							</Button>
						</div>
					))}

					<Button
						className="self-end"
						type="submit"
						form="form-task"
						disabled={taskMutation.isPending}
					>
						{taskMutation.isPending && (
							<Loader2 className="animate-spin" />
						)}
						{"Submit "}
					</Button>
				</form>
			</Form>
			{!variant && (
				<TaskActions
					className="self-center"
					taskId={task ? task._id : ""}
					action={dialogClose ? "delete" : "delete-page"}
				/>
			)}
		</div>
	);
}
