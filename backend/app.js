const express = require('express')
const app = express();
const morgan = require('morgan')
const cors = require('cors')

const accountRouter = require('./routes/conta')
const userRouter = require('./routes/users')

app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*')
    res.header(
        'Acces-Control-Allow-Header',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    if (req.method === 'OPTIONS') {
        res.header('Acces-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET')
        return res.status(200).send({})
    }
    next()
})

app.use('/conta', accountRouter)
app.use('/user', userRouter)

app.use((req, res, next) => {
    const erro = new Error('Route not found')
    erro.status = 404
    next(erro)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        erro: {
            message: error.message
        }
    })
})



module.exports = app;