require('dotenv/config');
import { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { initializeTransactionalContext } from 'typeorm-transactional';

const express = require('express');
initializeTransactionalContext();
const app = express();

const corsOption = {
    origin: '*',
    methods: 'GET,POST,HEAD,OPTIONS,PUT,PATCH,DELETE',
    credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());

require('../rest/routes/user.routes')(app);
require('../rest/routes/bank.routes')(app);
require('../rest/routes/bank-account.routes')(app);

app.use((error: { status: any; message: any; }, req: Request, resp: Response, next: NextFunction) => {
    resp.status(error.status || 500).json({
        message: error.message || 'Unexpected error'
    });
});

export default app;
