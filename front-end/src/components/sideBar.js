import React, { useState, useEffect } from "react";
import { useAuth } from "./authContext";
import "../styles/sideBar.css";

function DayType(token, setToken) {
	const { user, loggedin, typeOfDay } = useAuth();

	return (
		<div className="wrapperside">
			{loggedin ? (
				<h1>
					Today, <br></br>
					{new Date().toLocaleDateString()}, <br></br>is a{" "}
					{typeOfDay ? "bones" : "no bones"} day!{" "}
				</h1>
			) : (
				<h1> Log in to see what kind of a day today will be!</h1>
			)}
			{loggedin && typeOfDay ? (
				<img
					className="type img"
					src="https://i.ibb.co/Q3TZLJZC/finalbones1.png"
					alt="bones day"
					border="0"
				></img>
			) : (
				<img
					className="type img"
					src="https://i.ibb.co/spMf3RjC/finalnobones1.png"
					alt="no bones day"
					border="0"
				></img>
			)}
		</div>
	);
}

export default DayType;
