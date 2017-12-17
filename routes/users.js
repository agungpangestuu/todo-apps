const express = require('express');
const router = express.Router();
const Controller = require('../controllers/userTask')
const auth = require('../middleware/auth')

/* GE`T users listing. */
router.get('/get-all-user_task', auth.CheckLogin, Controller.getAll)

router.get('/get-all-task', auth.CheckLogin, auth.authoriztion, Controller.getAllTask)

router.post('/create-task', auth.CheckLogin, Controller.createTask)

router.put('/edit-task/:idTask', auth.CheckLogin, Controller.updateTask)

router.put('/mark-task/idTask', auth.CheckLogin, Controller.markTask)

router.delete('/delete-task/:idTask', auth.CheckLogin, Controller.deleteTask)

module.exports = router;
