const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views/public'));



const PORT = process.env.PORT || 3000;
// json parser
app.use(express.json());
//refrencing all html and css file, without this, server wont run the file


// routes
app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/contents', require('./routes/contents'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
