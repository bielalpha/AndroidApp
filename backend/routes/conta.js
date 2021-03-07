const express = require('express')
const router = express.Router()
const login = require('../middleware/login')
const contaController = require('../controllers/contaController')

router.get('/', contaController.getContas)
router.post('/', contaController.postContas)
router.get('/:id_dividendo', contaController.getUmaConta)
router.patch('/', contaController.attConta)
router.delete('/', contaController.excludeConta)

module.exports = router 