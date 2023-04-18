//First, the program imports required packages such as express, dotenv, body-parser and mongoose.
const express = require("express");
const dotenv = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routes
const userRoutes = require('./routes/user')


dotenv.config(); // Return environment variables

// The mongoose.connect() function is used to connect to the MongoDB database. The database URL is constructed using three environment variables: DB_USER, DB_PASSWORD, and DB_DATABASE.
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.3a3gnjl.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => {
  console.log('Database Connected');
}).catch(() => {
    console.log('Database Connection Failed')
});

app.use(bodyParser.json()); // The body-parser middleware is used to parse JSON data sent in request bodies. 





//Finally, the server listens on the port specified by the PORT environment variable. When the server starts, a message is logged to the console indicating that the server is running on the specified port.
app.listen(process.env.PORT, () => {
  console.log(`server is running on the port: ${process.env.PORT}`);
});
