/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from "@/components/ui/sidebar";
import BonesLogo from "../assets/favicon-32x32.png";
import { useAuth } from "@/hooks/useAuth";
import "../styles/App.css";

import { Home, LayoutDashboardIcon } from "lucide-react";
import { useTypeOfDay } from "@/hooks/useTypeOfDay";

const items = [
	{
		title: "Home",
		url: "/",
		icon: Home,
	},
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: LayoutDashboardIcon,
	},
];

export default function SideBar() {
	const types = ["bones", "no bones"];
	const auth = useAuth();
	const typeQuery = useTypeOfDay();
	return (
		<Sidebar variant="inset">
			<SidebarHeader className="sidebar-header">
				<img
					src={BonesLogo}
					alt="bones app logo"
					width="30px"
				/>
				<span>Bones?</span>
			</SidebarHeader>

			<SidebarContent>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild>
								<a href={item.url}>
									<item.icon />
									<span>{item.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
				<SidebarGroup></SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="flex flex-col border-1 border-blue-500 rounded-sm">
				<div className="font-bold ">
					{!typeQuery.isPending && !typeQuery.isError
						? "Hi " +
						  auth?.username +
						  "! Today is a " +
						  types[typeQuery.data] +
						  " day!"
						: "Log in or wait to see the type of day!"}
				</div>
				{!typeQuery.isPending &&
					!typeQuery.isError &&
					(!typeQuery.data ? (
						<img
							className="m-0"
							src="https://i.ibb.co/Q3TZLJZC/finalbones1.png"
							alt="bones day"
							loading="lazy"
						></img>
					) : (
						<img
							className="m-0"
							src="https://i.ibb.co/spMf3RjC/finalnobones1.png"
							alt="no bones day"
						></img>
					))}
			</SidebarFooter>
		</Sidebar>
	);
}
