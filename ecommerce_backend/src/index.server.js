
const express = require("express");
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routes
const userRoutes = require('./routes/user')


//routes
const userRoutes = require('./routes/user');

env.config(); 

// Add error handling for Mongoose connection
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.3a3gnjl.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => {
  console.log('Database Connected');
}).catch((err) => {
    console.log(err)
});

app.use(bodyParser.json()); // Call json() function of bodyParser to parse JSON data

app.get('/', (req,res,next) => {
  res.status(200).json({
    message: "Hello from the server"
  });
});

app.post('/data', (req,res,next) => {
  res.status(200).json({
    message: req.body
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on the port: ${process.env.PORT}`);
});
