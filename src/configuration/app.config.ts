require('dotenv/config');
import { Request, Response, NextFunction } from "express"
import cors from "cors";

const express = require("express");
const app = express()

const NO_CONTENT_HTTP_STATUS: number = 204

app.use((req: Request, res: Response, next: NextFunction) => {
    const origin = req.get('origin');

    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma, Access-Control-Request-Method, Access-Control-Allow-Headers, Access-Control-Request-Headers');

    if (req.method === 'OPTIONS') {
        res.sendStatus(NO_CONTENT_HTTP_STATUS);
    } else {
        next();
    }
});

const corsOption = {
    origin: "*",
    methods: 'GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE',
    credentials: true,
}

app.use(cors(corsOption));
app.use(express.json());


app.use((error: { status: any; message: any; }, req: Request, resp: Response, next: NextFunction) => {
    resp.status(error.status || 500).json({
        message: error.message || 'Unexpected error'
    })
})

export default app;
