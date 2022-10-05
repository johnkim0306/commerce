const express = require('express');
const router = express.Router();

const dbConfig = {
    database: "sys",
    connectionLimit: 30,
    host: "192.168.219.186",
    user: "root",
    password: "root"
};

const dbPool = require('mysql').createPool(dbConfig);
let sql = require('../sql/sql');

router.post('/login', async (request, res) => {
    try {
      await req.db('signUp', request.body.param);
      if (request.body.param.length > 0) {
        for (let key in request.body.param[0]) request.session[key] = request.body.param[0][key];
        res.send(request.body.param[0]);
      } else {
        res.send({
          error: "Please try again or contact system manager."
        });
      }
    } catch (err) {
      res.send({
        error: "DB access error"
      });
    }
});

router.post('/logout', async (request, res) => {
    request.session.destroy();
    res.send('ok log out right now');
});

router.post('/:alias', async (request, res) => {
    try {
        res.send(await req.db(request.params.alias, request.body.param));
    } catch (err) {
        res.status(500).send({
        error: err
        });
    }
});

const req = {
    async db(alias, param = [], where = '') {
        return new Promise((resolve, reject) => dbPool.query(sql[alias].query + where, param, (error, rows) => {
        if (error) {
            if (error.code != 'ER_DUP_ENTRY')
            console.log(error);
            resolve({
            error
            });
        } else resolve(rows);
        }));
    }
};

module.exports = router;