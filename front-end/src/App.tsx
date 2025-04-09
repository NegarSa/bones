import { Route, Routes } from "react-router";

import Protected from "./components/Protected";
import TaskList from "./pages/TaskList";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/Signup";
import NewTask from "./pages/NewTask";
import Login from "./pages/Login";
import TaskPage from "./pages/TaskPage";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import { SidebarInset } from "@/components/ui/sidebar";

//import "./styles/App.css";

function App() {
	return (
		<>
			<SideBar />
			<SidebarInset className="main-side">
				<div className="Main">
					<NavBar />
					<div className="App">
						<Routes>
							<Route element={<Protected />}>
								<Route
									path="/dashboard"
									element={<Dashboard />}
								/>
							</Route>
							<Route element={<Protected />}>
								<Route
									path="/"
									element={<TaskList />}
								/>
							</Route>
							<Route element={<Protected />}>
								<Route
									path="/newtask"
									element={<NewTask />}
								/>
							</Route>
							<Route element={<Protected />}>
								<Route
									path="/task/:id"
									element={<TaskPage />}
								/>
							</Route>
							<Route
								path="/login"
								element={<Login />}
							/>
							<Route
								path="/signup"
								element={<SignUp />}
							/>
						</Routes>
					</div>
				</div>

				{/* <Footer /> */}
			</SidebarInset>
		</>
	);
}

export default App;
