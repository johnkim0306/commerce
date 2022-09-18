let sql = require('../sql.js');

const dbConfig = {
    database: "sys",
    connectionLimit: 30,
    host: "localhost",
    user: "root",
    password: "root"
};

const dbPool = require('mysql').createPool(dbConfig);

let db = {};

db.all = () => {
    return new Promise((resolve, reject) => {
        dbPool.query(sql[alias].query + where, param, (error, results) => {
            if(error) {
                return reject(error);
            }
            return resolve(results);
        });
    });
};

module.exports = db;