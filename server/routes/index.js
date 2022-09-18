const express = require('express');
const db = require('../db')

const app = express.Router();

app.get('/api/download', async (request, res) => {
    console.log("swag");
    const sqlexample = 'show tables';
    console.log(sqlexample);

    dbPool.query(sqlexample, (error, doc)=>{
        if (error) throw error;
        res.send(doc);
    })
    
    /*
    try {
        res.send(await req.db(request.params.alias));
    } catch (err) {
        res.status(500).send({
        error: err
        });
    }
    */
});