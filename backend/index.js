require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const path = require("path")

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_NAME}.gh4nv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`);
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.set("views",path.join(__dirname,"views"))
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
//List api:
app.use('/api/account', cors(corsOptions), require('./routes/account'));
app.use('/api/account-details', cors(corsOptions), require('./routes/accountDetail'));
// app.use('/api/jobs',cors(corsOptions), require('./routes/status'));
// app.use('/api/tags',cors(corsOptions), require('./routes/registration'));
app.use('/api/jobs', cors(corsOptions), require('./routes/jobs'));


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
