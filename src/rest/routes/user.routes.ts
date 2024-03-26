

module.exports = (app: any) => {
    const usersController = require("../controllers/user.controller");

    const router = require("express").Router();
    router.post("/", usersController.register);
    router.post("/login", usersController.login)

    app.use('/api/v1/users', router);

}; 