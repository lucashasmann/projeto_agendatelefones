const con = require('../connect');

function create(req, res) {
    const { nome, telefone, obs } = req.body;
    const sql = `INSERT INTO telefones (nome, telefone, obs) VALUES ('${nome}', '${telefone}', '${obs}')`;
    con.query(sql, (error, result) => {
        if (error) {
            res.status(500).json('Erro ao cadastrar telefone');
        } else {
            res.status(201).json('Telefone cadastrado com sucesso');
        }
    });
};

function read(req, res) {
    const sql = 'SELECT * FROM telefones';
    con.query(sql, (error, result) => {
        if (error) {
            res.status(500).json('Erro ao consultar telefones');
        } else {
            res.status(200).json(result);
        }
    });
}

function deleteTelefone(req, res) {
    const telefoneId = req.params.id;
    const sql = `DELETE FROM telefones WHERE telefone_id = ${telefoneId}`;
    con.query(sql, (error, result) => {
        if (error) {
            res.status(500).json('Erro ao deletar telefone');
        } else if (result.affectedRows === 0) {
            res.status(404).json('Telefone não encontrado');
        } else {
            res.status(200).json('Telefone deletado com sucesso');
        }
    });
}

module.exports = {
    create,
    read,
    deleteTelefone
};
