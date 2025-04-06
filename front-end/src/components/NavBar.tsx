import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import BonesLogo from "../assets/favicon-32x32.png";

export default function NavBar() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<SidebarTrigger />
				</NavigationMenuItem>
				<NavigationMenuItem>
					<img
						src={BonesLogo}
						alt="bones app logo"
						width="30px"
					/>
				</NavigationMenuItem>
				<NavigationMenuItem>BONES?</NavigationMenuItem>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Item One</NavigationMenuTrigger>
					<NavigationMenuContent>
						<NavigationMenuLink>Link</NavigationMenuLink>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
