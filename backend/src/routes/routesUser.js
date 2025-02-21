const express = require('express');
const controllerUser = require("../controllers/controllerUser");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/middlewareAuth");

const router = express.Router();

router.post('/signup', controllerUser.registerUser);
router.post('/login', controllerUser.logInUser);
router.get('/logout',  controllerUser.logOut);
router.get('/profile', isAuthenticatedUser, controllerUser.getUserProfile);
router.get('/update', isAuthenticatedUser, controllerUser.updateUserProfile);

//rutas admin
router.get('/', isAuthenticatedUser, authorizeRoles("admin"), controllerUser.getAllUsers);
router.get('/:id', isAuthenticatedUser, authorizeRoles("admin"), controllerUser.getUserById);
router.put('/:id', isAuthenticatedUser, authorizeRoles("admin"), controllerUser.updateUser);
router.delete('/:id', isAuthenticatedUser, authorizeRoles("admin"), controllerUser.deleteUser);

module.exports = router;