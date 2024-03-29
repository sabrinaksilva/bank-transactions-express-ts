module.exports = (app: any) => {
    require('dotenv/config');
    const authenticate: string | any = process.env.AUTHENTICATE;


    const bankAccountController = require('../controllers/bank-account.controller');
    const router = require('express').Router();

    if (authenticate === 'true') {
        const authenticationMiddleware = require('../../middlewares/authentication.middleware');
        app.use(authenticationMiddleware.authenticate);
    }


    router.post('/', bankAccountController.create);
    router.post('/transfer', bankAccountController.makeTransfer);

    app.use('/api/v1/banks/accounts', router);

};