const express = require("express");
const env = require('dotenv')
const app = express();
const bodyParser = require('body-parser');


env.config();

app.use(bodyParser());


app.get('/', (req,res,next) => {
    res.status(200).json({
        message: "Hello from the server"
    });
})

app.post('/data', (req,res,next) => {
    res.status(200).json({
        message: req.body
    });
})

app.listen(process.env.PORT, () => {
    console.log(`server is running on the port: ${process.env.PORT}`)
})