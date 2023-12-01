const express = require('express')
const router = express.Router()
const controller = require('../controller')
const { auth } = require('../utils/jwt')

//API DATA
router.get('/getUsers', auth, controller.users.get)
router.get('/getUsers/:id', auth, controller.users.getById)
router.put('/updateUsers/:id', auth, controller.users.update)
router.post('/addUsers', auth, controller.users.create)

router.post('/login', controller.users.login)
router.post('/registerForm', controller.users.registerForm)

module.exports = router