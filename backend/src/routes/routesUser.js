const express = require('express');
const controllerUser = require("../controllers/controllerUser");
const { isAuthenticatedUser } = require("../middlewares/middlewareAuth");

const router = express.Router();

router.post('/signup', controllerUser.registerUser);
router.post('/login', controllerUser.logInUser);
router.get('/logout',  controllerUser.logOut);
router.get('/profile', isAuthenticatedUser, controllerUser.getUserProfile);

//rutas admin
router.get('/', isAuthenticatedUser, controllerUser.getAllUsers);
router.get('/:id', isAuthenticatedUser, controllerUser.getUserById);
router.put('/:id', isAuthenticatedUser, controllerUser.updateUser);
router.delete('/:id', isAuthenticatedUser, controllerUser.deleteUser);

module.exports = router;