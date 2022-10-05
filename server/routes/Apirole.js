const express = require('express');
const router = express.Router();

router.post('/:alias', async (request, res) => {
    if (!request.session.email) {
      return res.status(401).send({
        error: 'You need to login.'
      });
    }
  
    try {
       res.header("Access-control-allow-origin", "localhost:3000" )
      res.send(await req.db(request.params.alias));
    } catch (err) {
      res.status(500).send({
        error: err
      });
    }
});

module.exports = router;