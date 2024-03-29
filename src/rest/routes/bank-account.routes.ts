module.exports = (app: any) => {
    const bankAccountController = require('../controllers/bank-account.controller');

    const router = require('express').Router();
    router.post('/', bankAccountController.create);
    router.post('/transfer', bankAccountController.makeTransfer);

    app.use('/api/v1/banks/accounts', router);

};