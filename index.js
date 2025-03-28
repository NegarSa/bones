import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes_tasks from "./routes/api_tasks.js";
import routes_users from "./routes/api_users.js";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cookieParser(process.env.cookie_key));
const PORT = process.env.PORT || 5000;

app.use(
	cors({
		origin: [
			"https://bones-app-cra6gdf2f3fzeddb.canadacentral-01.azurewebsites.net",
		],
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		allowedHeaders: [
			"Origin",
			"X-Requested-With",
			"Content-Type",
			"Accept",
			"Authorization",
		],
		credentials: true,
	})
);
app.use(json());

mongoose
	.connect(process.env.ATLAS_URI)
	.then(() => {
		console.log("Atlas DB Connected...");
	})
	.catch((err) => {
		console.log("Atlas DB connection failed...", err);
	});

mongoose.connection.once("open", () => {
	console.log("MongoDB database connection established successfully");
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.use(express.static("./front-end/build"));

app.use("/api/tasks", routes_tasks);
app.use("/api/users", routes_users);

app.get("/*", function (req, res) {
	res.sendFile(path.join(__dirname, "./front-end/build", "index.html"));
});

app.use((err, req, res, next) => {
	console.log(err);
	next();
});
