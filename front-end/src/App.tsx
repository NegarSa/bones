import { Route, Routes } from "react-router";
import "./App.css";
import Protected from "./components/Protected";
import TaskList from "./components/taskList";
import Header from "./components/navBar";
import Footer from "./components/footer";
import Login from "./components/login";
import DayType from "./components/sideBar";
import TaskPage from "./components/taskPage";
import NewTask from "./components/newTask";
import SignUp from "./components/signup";
import Dashboard from "./components/dashboard";

function App() {
	return (
		<div className="Main">
			<Header />
			<div className="body row scroll-y">
				<div className="App">
					<div className="left-col"></div>
					<DayType />
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
