const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes/api');
require('dotenv').config()


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 
mongoose.connect(process.env.ATLAS_URI);


const connection = mongoose.connection;
connection.once('open', () => {
	console.log("MongoDB database connection established successfully");
})

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.use('/api', routes);

app.use((err, req, res, next) => {
	console.log(err);
	next();
});

