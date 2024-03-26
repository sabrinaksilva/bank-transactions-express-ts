

module.exports = (app: any) => {
    const bankController = require("../controllers/bank.controller");

    const router = require("express").Router();
    router.post("/", bankController.create);

    app.use('/api/v1/banks', router);

};