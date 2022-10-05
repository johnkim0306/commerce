const express = require('express');
const app = express();
const session = require('express-session');
const fs = require('fs');
const cors = require('cors');

app.use(cors());
app.use(express.json({
    limit: '60mb'
  }));

app.use(session({
    secret: 'secret code',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 80
    }
}));

const port = 3000;
const server = app.listen(port, () => {
    console.log('Server is starting at port 3000');
});

fs.watchFile(__dirname + '/sql.js', (curr, prev) => {
console.log('sql restarting');
    delete require.cache[require.resolve('./sql/sql.js')];
    sql = require('./sql/sql.js');
})

const apiRoute = require('./routes/Api');
const uploadRoute = require('./routes/Upload');
const downnloadRoute = require('./routes/Download');
const apiroleRoute = require('./routes/Apirole');

app.use("/api", apiRoute);
app.use("/upload", uploadRoute);
app.use("/download", downnloadRoute);
app.use("/apirole", apiroleRoute);