const express = require('express');
const app = express();
const session = require('express-session');
const fs = require('fs');

app.use(session({
    secret: 'secret code',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 //cookie
    }
}));

const port = 3000;

const server = app.listen(port, () => {
    console.log('Server is starting at port 3000');
});

let sql = require('./sql.js');

fs.watchFile(__dirname + '/sql.js', (curr, prev) => {
    console.log('sql restarting');
    delete require.cache[require.resolve('./sql.js')];
    sql = require('./sql.js');
})

const dbConfig = {
    database: "sys",
    connectionLimit: 30,
    host: "192.168.219.186",
    user: "root",
    password: "root"
};

const dbPool = require('mysql').createPool(dbConfig);



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


app.post('/api/login', async (request, res) => {
     request.session['email'] = 'seungwon.go@gmail.com';
     res.send('ok login right now ');

});
app.post('/api/logout', async (request, res) => {
    request.session.destroy();
    res.send('ok log out right now');
});

app.post('/apirole/:alias', async (request, res) => {
    if (!request.session.email) {
      return res.status(401).send({
        error: 'You need to login.'
      });
    }
  
    try {
      res.send(await req.db(request.params.alias));
    } catch (err) {
      res.status(500).send({
        error: err
      });
    }
  });

app.post('/api/:alias', async (request, res) => {
    if (!request.session.email) {
        return res.status(401).send({
          error: 'You need to login.'
        });
    }

    try {
        res.send(await req.db(request.params.alias));
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