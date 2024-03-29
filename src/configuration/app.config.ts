import cors from 'cors';
import { initializeTransactionalContext } from 'typeorm-transactional';
import 'express-async-errors';

require('dotenv/config');

const errorHandlerMiddleware = require('../middlewares/error-handler.middleware');
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

app.use(errorHandlerMiddleware.handle);

export default app;
