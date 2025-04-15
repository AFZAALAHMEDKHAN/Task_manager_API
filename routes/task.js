const express = require('express')

const router = express.Router()

const {getAllTasks,createTask,getTaskbyId,updateTask,deleteTask} = require('../controllers/task')

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTaskbyId).patch(updateTask).delete(deleteTask)


module.exports = router