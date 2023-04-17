const express = require("express");
const env = require('dotenv')

const app = express();

env.config();

app.listen(process.env.PORT, () => {
    console.log(`server is running on the port: ${process.env.PORT}`)
})