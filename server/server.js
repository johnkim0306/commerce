const express = require('express');
const app = express();

const port = 3000;

const server = app.listen(port, () => {
    console.log('Server is starting at port 3000');
});