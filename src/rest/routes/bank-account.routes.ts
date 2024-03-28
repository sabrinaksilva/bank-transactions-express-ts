module.exports = (app: any) => {
    const bankAccountController = require('../controllers/bank-account.controller');

    const router = require('express').Router();
    router.post('/', bankAccountController.create);

    app.use('/api/v1/banks/accounts', router);

};