import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "../styles/forms.css";
import { Link, useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { userLogin } from "@/utils/apiEndpoints";
import { Loader2 } from "lucide-react";
import { useUserQuery } from "@/hooks/useUserQuery";

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
});

export default function Login() {
	const navigate = useNavigate();
	const userQuery = useUserQuery();
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { email: "", password: "" },
	});

	const LoginMutation = useMutation({
		mutationFn: (data: { email: string; password: string }) =>
			userLogin(data),
		onError: () => {
			alert(LoginMutation.error);
		},
		onSuccess: async () => {
			await userQuery.refetch();
			await navigate("/");
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		if (values.email !== "" && values.password !== "") {
			LoginMutation.mutate({
				email: values.email,
				password: values.password,
			});
		}
	}
	return (
		<div className="wrapper-login">
			<span className="login-indicator-text">Login!</span>
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
					<Button
						type="submit"
						disabled={LoginMutation.isPending}
					>
						{LoginMutation.isPending && (
							<Loader2 className="animate-spin" />
						)}
						Submit
					</Button>
				</form>
			</Form>
			<Button
				variant="ghost"
				asChild
			>
				<Link to="/signup">Don't have an accout? Sign Up!</Link>
			</Button>
		</div>
	);
}
