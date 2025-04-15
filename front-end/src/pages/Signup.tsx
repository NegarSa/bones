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
import "../styles/forms.css";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { userSignup } from "@/utils/apiEndpoints";
import { Loader2 } from "lucide-react";
import User from "../utils/userInterface";
const formSchema = z.object({
	email: z
		.string()
		.min(1, {
			message: "Please enter an email",
		})
		.email("This is not a valid email address"),
	password: z.string().min(1, {
		message: "Please enter a password",
	}),
	frequency: z.number().min(1).max(7),
	username: z.string().min(1, {
		message: "Please enter a username",
	}),
});

export default function SignUp() {
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	const SignUpMutation = useMutation({
		mutationFn: (data: User) => userSignup(data),
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		SignUpMutation.mutate(values as unknown as User);
		if (SignUpMutation.isError) {
			alert(SignUpMutation.error);
			return;
		} else if (!SignUpMutation.isPending) {
			await navigate("/login");
		}
	}
	return (
		<div className="wrapper-login">
			<span className="login-indicator-text">Sign Up!</span>
			<Form {...form}>
				<form
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
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
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type="password"
										placeholder=""
										{...field}
									/>
								</FormControl>
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
					<Button
						type="submit"
						disabled={SignUpMutation.isPending}
					>
						{SignUpMutation.isPending && (
							<Loader2 className="animate-spin" />
						)}
						Submit
					</Button>
				</form>
			</Form>
		</div>
	);
}
