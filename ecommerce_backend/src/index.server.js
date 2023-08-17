/**
 * * title: Flipkart backend server
 * * description: this is the core backend server file to create the api for our website
 * * author: Tareq Monower
 *
 * @format */

const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

// importing user routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const initialDataRoutes = require("./routes/admin/initialData");

//adding environment variables
env.config();

// Adding mongoose database connection to my API
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.3a3gnjl.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Database Connected");
  });

mongoose.set("useFindAndModify", false);

//importing all the middlewires here
app.use(cors()); //using this call this api from anywhere in the localhost
app.use(express.json());

//declaring a static route with this middlewire backend
app.use("/public", express.static(path.join(__dirname, "uploads")));
console.log(__dirname);
//importing all the api routes
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", initialDataRoutes);

//listenting the server
app.listen(process.env.PORT, () => {
  console.log(`server is running on the port: ${process.env.PORT}`);
});
