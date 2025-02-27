import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes_tasks from "./routes/api_tasks.js";
import routes_users from "./routes/api_users.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());
mongoose.connect(process.env.ATLAS_URI);

mongoose.connection.once("open", () => {
	console.log("MongoDB database connection established successfully");
});

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.use("/api/tasks", routes_tasks);
app.use("/api/users", routes_users);

app.use((err, req, res, next) => {
	console.log(err);
	next();
});
