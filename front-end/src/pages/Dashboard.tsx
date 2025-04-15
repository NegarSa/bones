import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userEdit, userSignout } from "@/utils/apiEndpoints";
import { Loader2 } from "lucide-react";
import { useUserQuery } from "@/hooks/useUserQuery";
import User from "../utils/userInterface";

const formSchema = z.object({
	email: z
		.string()
		.min(1, {
			message: "Please enter an email",
		})
		.email("This is not a valid email address"),
	frequency: z.number().min(1).max(6),
	username: z.string().min(1, {
		message: "Please enter a username",
	}),
});

export default function Dashboard() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const userQuery = useUserQuery();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: userQuery.data?.email,
			frequency: userQuery.data?.frequency ?? 2,
			username: userQuery.data?.username,
		},
	});
	const SignoutMutation = useMutation({
		mutationFn: () => userSignout(),
		onSuccess: async () => {
			await navigate("/login");
			return queryClient.invalidateQueries({ queryKey: ["getUser"] });
		},
		onError: () => {
			alert("something went wrong while signing out");
		},
	});

	const UserMutation = useMutation({
		mutationFn: (data: User) => userEdit(userQuery.data?._id, data),
		onSuccess: async () => {
			await navigate("/");
			return queryClient.invalidateQueries({ queryKey: ["getUser"] });
		},
		onError: () => {
			alert(UserMutation.error);
		},
	});
	function onSignout() {
		SignoutMutation.mutate();
	}
	function onSubmit(values: z.infer<typeof formSchema>) {
		UserMutation.mutate({
			email: userQuery.data.email,
			_id: userQuery.data._id,
			frequency: values.frequency,
			username: values.username,
		});
	}
	return (
		<div className="flex flex-col items-center justify-center float-center object-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex flex-col p-10 space-y-3"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										disabled={true}
										placeholder=""
										{...field}
									/>
								</FormControl>
								<FormDescription>
									This is the email you signed up with.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="username"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
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
						name="frequency"
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									Frequency of no bones days per week
								</FormLabel>
								<FormControl>
									<select
										className="border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
										{...field}
										onChange={(e) =>
											field.onChange(
												Number(e.target.value)
											)
										}
									>
										<option value={1}>1</option>
										<option value={2}>2</option>
										<option value={3}>3</option>
										<option value={4}>4</option>
										<option value={5}>5</option>
										<option value={6}>6</option>
									</select>
								</FormControl>
							</FormItem>
						)}
					/>
					{/* <FormField
						control={form.control}
						name="sync"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Sync the type of day:</FormLabel>
								<FormControl>
									<Input
										placeholder=""
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Do you want to sync your day types with a
									friend so that you can plan together? Enter
									their email here!
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/> */}
					<Button
						type="submit"
						disabled={UserMutation.isPending}
					>
						{UserMutation.isPending && (
							<Loader2 className="animate-spin" />
						)}
						Submit
					</Button>
				</form>
			</Form>
			<Button
				variant="destructive"
				onClick={onSignout}
			>
				SignOut!
			</Button>
		</div>
	);
}
