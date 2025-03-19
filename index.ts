import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import task_routes from "./api/task_routes.js";
import user_routes from "./api/user_routes.js";


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(
	cors({
		origin: process.env.url,
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

if (process.env.ATLAS_URI !== undefined){
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
}
else {
    console.log("No Atlas URI providied for connection to the database.")
}

app.get('/', (request, response) => {
	response.send('Hello world!');
  });

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});


// React routes for later
// app.use(express.static("./front-end/build"));

app.use("/api/tasks", task_routes);
app.use("/api/users", user_routes);

// app.get("/*", function (req: Request, res: Response) {
// 	res.sendFile(path.join(__dirname, "./front-end/build", "index.html"));
// });

app.use((err: Error, req: Request, res: Response, next: Function) => {
	console.log(err);
	next();
});