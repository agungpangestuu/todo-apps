const express = require('express');
const router = express.Router();
const SignController = require('../controllers/users')
const auth = require('../middleware/auth')

/* GE`T users listing. */
router.get('/users', auth.CheckLogin, auth.authoriztion, SignController.getAllUser)

router.post('/signup', SignController.create)

router.post('/signin', SignController.login)

router.put('/update/:idUser', auth.CheckLogin, SignController.updateUser)

router.delete('/delete/:idUser', auth.CheckLogin, auth.authoriztion, SignController.deleteUser)

module.exports = router;
