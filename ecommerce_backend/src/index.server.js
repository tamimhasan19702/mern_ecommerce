
const express = require("express");
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routes
const userRoutes = require('./routes/user');

env.config(); 

// Add error handling for Mongoose connection
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.3a3gnjl.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
).then(() => {
  console.log('Database Connected');
});

app.use(bodyParser.json()); 
app.use('/api',userRoutes);


app.listen(process.env.PORT, () => {
  console.log(`server is running on the port: ${process.env.PORT}`);
});
