import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";

import "./styles/index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthProvider.tsx";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: true,
			refetchOnReconnect: true,
			retry: 2,
			staleTime: 5 * 60 * 1000,
		},
	},
});

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<SidebarProvider>
						<App />
					</SidebarProvider>
				</AuthProvider>
			</QueryClientProvider>
		</BrowserRouter>
	</StrictMode>
);
