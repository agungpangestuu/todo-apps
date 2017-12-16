const express = require('express');
const router = express.Router();
const Controller = require('../controllers/userTask')

/* GE`T users listing. */
router.get('/get-all-task', Controller.getAll)

router.post('/create-task', Controller.createTask)

router.put('/edit-task/:idTask', Controller.updateTask)

router.delete('/delete-task/:idTask', Controller.deleteTask)

module.exports = router;
