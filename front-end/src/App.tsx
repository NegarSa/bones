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
import Footer from "./components/Footer";

import "./styles/App.css";

function App() {
	return (
		<div className="Main">
			<NavBar />
			<div className="body row scroll-y">
				<div className="App">
					<div className="left-col"></div>
					<SideBar />
					<div className="right-col">
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
									path="/task/new"
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
			</div>
			<Footer />
		</div>
	);
}

export default App;
