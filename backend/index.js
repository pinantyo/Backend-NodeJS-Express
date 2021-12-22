require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const path = require("path")

require("./config/database").connect();

app.set("views",path.join(__dirname,"views"))


var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true})); 


//List api:
app.use('/api/', require('./routes'));


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
