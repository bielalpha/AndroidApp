const mysql = require('../mysql').pool
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.postCadastro = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: error }) }
        conn.query('SELECT * FROM users WHERE email = ?', [req.body.email], (error, result) => {
            if (error) { return res.status(500).send({ error: error }) }
            if (result.length > 0) {
                res.status(409).send({ mesage: "Usuario já cadastrado" })
            } else {
                bcrypt.hash(req.body.password, 10, (errBcrypt, hash) => {
                    if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
                    conn.query('INSERT INTO users (email, password) VALUES (?,?)', [req.body.email, hash],
                        (error, result) => {
                            conn.release()
                            if (error) { return res.status(500).send({ error: error }) }
                            response = {
                                mesage: 'Usuario criado com sucesso',
                                user: {
                                    id_user: result.insertId,
                                    email: req.body.email
                                }
                            }
                            return res.status(201).send(response)
                        })
                })
            }
        })
    })
}

exports.postLogin = (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: err }) }
        const query = 'SELECT * FROM users WHERE email = ?';
        conn.query(query, [req.body.email], (error, result, fields) => {
            conn.release()
            if (error) { return res.status(500).send({ error: error }) }
            if (result.length < 1) {
                return res.status(401).send({ mesage: 'Falha na autenticaçao' })
            }
            bcrypt.compare(req.body.password, result[0].password, (err, results) => {
                if (err) {
                    return res.status(401).send({ mesage: 'Falha na autenticaçao' })
                }
                if (results) {
                    const token = jwt.sign({
                        id_user: results.id_user,
                        email: results.email
                    }, process.env.JWT_KEY, {
                        expiresIn: "1h"
                    })
                    return res.status(200).send({ mesage: 'E-mail autenticada com sucesso', token: token, email: req.body.email })
                }
                return res.status(401).send({ mesage: 'Falha na autenticaçao' })
            })
        })
    })
}