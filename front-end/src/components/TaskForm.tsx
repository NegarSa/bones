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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
const taskSchema = z.object({
	action: z.string().min(1, "Task action is required"),
	type_of_day: z.string(),
	description: z.string().nullable(),
	deadline: z
		.date()
		// .refine((date) => !isNaN(Date.parse(date)), {
		// 	message: "Invalid date format",
		// })
		.nullable(),
	// subtasks: z.array(
	// 	z.object({
	// 		subtaskName: z.string().min(1, "Task action is required"),
	// 	})
	// ),
});
interface propsType {
	variant: boolean;
	task?: Task;
	dialogClose?: Function;
}
import { taskRemove } from "../utils/apiEndpoints";
import { useQuery } from "@tanstack/react-query";

export default function TaskForm(props: propsType) {
	const { variant, task, dialogClose } = props;
	const [loading, setLoading] = useState(false);
	const [date, setDate] = useState<Date>();
	const queryClient = useQueryClient();
	// const deleteQuery = useQuery({
	// 	queryKey: ["deleteTask", task ? task._id : ""],
	// 	queryFn: () => taskRemove(task ? task._id : ""),
	// 	enabled: false,
	// });
	const nav = useNavigate();
	const taskMutation = useMutation({
		mutationFn: (data: { action: string; description: string }) =>
			taskNew(data as Task),
	});
	const taskMutationEdit = useMutation({
		mutationFn: (data: Task) => taskEditAll(task!._id, data),
	});

	const form = useForm<z.infer<typeof taskSchema>>({
		resolver: zodResolver(taskSchema),
		defaultValues: {
			action: variant ? "" : task?.action,
			type_of_day: variant ? "bones" : task?.type_of_day,
			deadline: variant ? "" : "",
			description: variant ? "" : task?.description,
			// subtasks:
			// 	varient === "new"
			// 		? []
			// 		: task?.subtasks.map((subtask) => {
			// 				return { subtaskName: subtask.action };
			// 		  }),
		},
	});
	// const { fields, append, remove } = useFieldArray({
	// 	control: form.control,
	// 	name: "subtasks",
	// });

	async function onSubmit(data: z.infer<typeof taskSchema>) {
		const finalMutation = variant ? taskMutation : taskMutationEdit;
		finalMutation.mutate({
			action: data.action,
			description: data.description,
			type_of_day: data.type_of_day,
			deadline: date,
		} as Task);
		if (finalMutation.isError) {
			alert(finalMutation.error);
			return;
		}
		if (!finalMutation.isPending) {
			await queryClient.refetchQueries({
				queryKey: ["getTasks"],
			});
			if (dialogClose) dialogClose(false);
			else {
				await nav("/");
			}
		}
	}
	async function onDelete() {
		try {
			const res = await taskRemove(task?._id);
		} catch {
		} finally {
			await nav("/");
		}
	}
	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
					id="form-task"
				>
					<FormField
						control={form.control}
						name="action"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Task</FormLabel>
								<FormControl>
									<Input
										placeholder=""
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
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
									<select className="w-[280px]">
										<option value="bones">Bones</option>
										<option value="no bones">
											No bones
										</option>
										<option value="both">Both</option>
									</select>
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
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant={"outline"}
												className={cn(
													"w-[280px] justify-start text-left font-normal",
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
												selected={field.value}
												onSelect={field.onChange}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						form="form-task"
						disabled={taskMutation.isPending || loading}
					>
						{taskMutation.isPending && (
							<Loader2 className="animate-spin" />
						)}
						{"Submit "}
					</Button>
				</form>
			</Form>
			<Button
				variant="destructive"
				onClick={onDelete}
			>
				DELETE TASK
			</Button>
		</>
	);
}
