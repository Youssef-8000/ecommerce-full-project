const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./dbConnection/db_config');
const userRouter = require('./routes/user-router');

const app = express();
const apiPort = 5000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use('/api', userRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
