const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


app.use(bodyParser.json());

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

// const posts = require('./routes/api/posts');

//api for posts
// app.use('/api/posts',cors(corsOptions), posts);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
