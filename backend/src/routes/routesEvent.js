const express = require('express');
const controllerEvent = require("../controllers/controllerEvent");
const { isAuthenticatedUser, optionalAuth } = require("../middlewares/middlewareAuth");

const router = express.Router();

router.get('/', optionalAuth, controllerEvent.getAllEvents);
router.get('/:id', isAuthenticatedUser, controllerEvent.getEventById);
router.post('/',isAuthenticatedUser, controllerEvent.createEvent)
router.put('/:id', isAuthenticatedUser, controllerEvent.updateEvent);
router.delete('/:id', isAuthenticatedUser, controllerEvent.deleteEvent);

module.exports = router;