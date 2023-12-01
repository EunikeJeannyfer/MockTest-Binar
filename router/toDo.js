const express = require('express')
const router = express.Router()
const controller = require('../controller')

//API DATA
router.get('/getTodo', controller.todo.get)
router.put('/updateTodo/:id', controller.todo.update)
router.post('/addTodo', controller.todo.create)
router.put('/delete/:id', controller.todo.destroy)
//get to do list by id 
router.get('/getTodo/:id', controller.todo.getToDoByUser)

module.exports = router