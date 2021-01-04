const express = require('express')
const router = express.Router()
const login = require('../middleware/login')
const contaController = require('../controllers/contaController')

router.get('/', contaController.getContas)
router.post('/',login.obrigatorio, contaController.postContas)
router.get('/:id_dividendo', contaController.getUmaConta)
router.patch('/', login.obrigatorio, contaController.attConta)
router.delete('/', login.obrigatorio, contaController.excludeConta)

module.exports = router