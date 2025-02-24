import React, { useState, useEffect } from "react";
import axios from "axios";

function DayType(token, setToken) {
	const [type, setType] = useState(false);

	return (
		<>
			<h1>Hi! Today is?</h1>
		</>
	);
}

export default DayType;
