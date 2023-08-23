const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Route to register a new user
router.post('/register', authController.register);

// Route to log in
router.post('/login', authController.login);

// router.get('/user', authController.users)
// Other authentication routes...

module.exports = router;
