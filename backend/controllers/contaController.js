const mysql = require('../mysql').pool

exports.getContas = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM dividendo;',
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    quantidade: result.length,
                    contas: result.map(cont => {
                        return {
                            id_gasto: cont.ID_gasto,
                            dia: cont.dia,
                            valor: cont.valor,
                            resumo: cont.resumo,
                            request: {
                                tipo: 'GET',
                                descricao: "Retorna todos as contas",
                                url: 'http://localhost:3000/conta/' + cont.ID_gasto
                            }
                        }
                    })
                }
                return res.status(200).send(response)
            }
        )
    })
}

exports.postContas = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status.send(500).send({ error: error }) }
        conn.query(
            'INSERT INTO dividendo(dia,valor,resumo)VALUES(now(),?,?)',
            [req.body.valor, req.body.resumo],
            (error, result, field) => {
                conn.release();
                if (error) {
                    res.status(500).send({ error: error })
                }
                const response = {
                    mensage: 'Dividendo inserida com sucesso',
                    conta: {
                        id_conta: result.ID_gasto,
                        valor: req.body.valor,
                        resumo: req.body.resumo,
                        request: {
                            tipo: 'POST',
                            descricao: "Insere produto",
                            url: 'http://localhost:3000/conta'
                        }
                    }
                }
                return res.status(201).send(response)
            }
        )
    })
}

exports.getUmaConta = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM dividendo WHERE ID_gasto = ?;',
            [req.params.id_dividendo],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensage: "Nao foi encontrado produto com este ID"
                    })
                }
                const response = {
                    conta: {
                        id_conta: result[0].ID_gasto,
                        valor: result[0].valor,
                        resumo: result[0].resumo,
                        request: {
                            tipo: 'GET',
                            descricao: "Retorna um unico produto",
                            url: 'http://localhost:3000/conta'
                        }
                    }
                }
                return res.status(201).send(response)
            }
        )
    })
}

exports.attConta = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'UPDATE dividendo SET valor = ?, resumo = ? WHERE ID_gasto = ?',
            [req.body.valor, req.body.resumo, req.body.ID_gasto],
            (error, result, field) => {
                conn.release();
                if (error) {
                    res.status(500).send({ error: error, response: null })
                }
                const response = {
                    mensage: 'Dividendo alterado com sucesso',
                    contaAtt: {
                        id_conta: req.body.ID_gasto,
                        valor: req.body.valor,
                        resumo: req.body.resumo,
                        request: {
                            tipo: 'GET',
                            descricao: "Retorna alteraçao do produto",
                            url: 'http://localhost:3000/conta/' + req.body.ID_gasto
                        }
                    }
                }
                return res.status(202).send(response)
            }
        )
    })
}

exports.excludeConta = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'DELETE FROM dividendo WHERE ID_gasto = ?', [req.body.ID_gasto],
            (error, result, field) => {
                conn.release();
                if (error) {
                    res.status(500).send({ error: error, response: null })
                }
                const response = {
                    mensage: 'Dividendo excluido com sucesso',
                    request: {
                        tipo: 'DELETE',
                        descricao: "Retorna alteraçao do produto",
                        url: 'http://localhost:3000/conta/'
                    }
                }
                return res.status(202).send(response)
            }
        )
    })
}