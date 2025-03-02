import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./authContext";
import "../styles/sideBar.css";

function DayType(token, setToken) {
	const [type, setType] = useState(false);
	const auth = useAuth();

	const displayType = () => {
		auth.getUser;
		axios
			.get("http://localhost:8181/api/users/day", {
				withCredentials: true,
			})
			.then((response) => {
				if (response.status === 200) {
					setType(response.data);
				}
			})
			.catch((error) => {
				if (error.status === 401) {
					setType(false);
					console.log("not logged in");
				} else {
					console.error(error);
				}
			});
		return type ? "bones" : "no bones";
	};

	return (
		<>
			<h1>
				Today, <br></br>
				{new Date().toLocaleDateString()}, <br></br>is a {displayType()}{" "}
				day!{" "}
			</h1>
		</>
	);
}

export default DayType;
