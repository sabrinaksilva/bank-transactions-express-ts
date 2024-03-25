
require('dotenv/config');

const express = require("express");


const app = express()
app.use(express.json());


// app.use((_req: any, _resp: any, next) => {
//     const error = new Error("Not found");
//     error.status = 404
//     next(error)
// })


// app.use((error: Error, req, resp, next) => {
//     resp.status(error.status || 500).json({
//         message: error.message || 'Unexpected error'
//     })
// })


const PORT = process.env.PORT || 8000;

app.listen(PORT, function () {
    console.log("Server is active on port " + PORT)
});