module.exports = (app: any) => {
    require('dotenv/config');
    const authenticate: string | any = process.env.AUTHENTICATE;

    const bankController = require('../controllers/bank.controller');
    const router = require('express').Router();

    if (authenticate === 'true') {
        const authenticationMiddleware = require('../../middlewares/authentication.middleware');
        app.use(authenticationMiddleware.authenticate);
    }


    router.post('/', bankController.create);
    app.use('/api/v1/banks', router);

};