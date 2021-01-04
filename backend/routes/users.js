const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')

router.post('/cadastro', usersController.postCadastro)
router.post('/login', usersController.postLogin)

module.exports = router