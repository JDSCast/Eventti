const express = require('express');
const controllerUser = require("../controllers/controllerUser");
const { refreshAccessToken } = require("../middlewares/middlewareAuth");


const router = express.Router();

router.get('/', refreshAccessToken, controllerUser.checkTokens);

module.exports = router;