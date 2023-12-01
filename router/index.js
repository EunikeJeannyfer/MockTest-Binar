const express = require('express')
const router = express.Router();

const users = require('./users')
const todo = require('./toDo')

router.use(users)
router.use(todo)

//view
router.get('/register', (req, res) => {
    res.render('register.ejs')
})

router.get('/login', (req, res) => {
    res.render('login.ejs')
})

module.exports = router;