/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
} from "@/components/ui/sidebar";
import BonesLogo from "../assets/favicon-32x32.png";
import { useAuth } from "@/hooks/useAuth";
import "../styles/App.css";

export default function SideBar() {
	const auth = useAuth();
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
				<SidebarGroup>hi for now</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="sidebar-footer">
				{auth?.email ? auth.email : "hi please log in"}
			</SidebarFooter>
		</Sidebar>
	);
}
