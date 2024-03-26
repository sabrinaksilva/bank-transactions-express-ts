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

app.use((error: { status: any; message: any; }, req: Request, resp: Response, next: NextFunction) => {
    resp.status(error.status || 500).json({
        message: error.message || 'Unexpected error'
    })
})

export default app;
