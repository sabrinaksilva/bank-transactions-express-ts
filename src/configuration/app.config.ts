require('dotenv/config');
import { Request, Response, NextFunction } from "express"
import cors from "cors";

const express = require("express");

const app = express()


const corsOption = {
    origin: "*",
    methods: 'GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE',
    credentials: true,
}

app.use(cors(corsOption));
app.use(express.json());

require("../rest/routes/user.routes")(app);
require("../rest/routes/bank.routes")(app)


export default app;
