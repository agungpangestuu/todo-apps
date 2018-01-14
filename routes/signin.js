const express = require('express');
const router = express.Router();
const SignController = require('../controllers/users')

router.post('/signin', SignController.login)


module.exports = router;

