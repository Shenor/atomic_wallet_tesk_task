var express = require('express');
var router = express.Router();
const emitter = require('../helpers/create-eventEmitter');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/users', (req, res) => {
  const {id} = req.body;
  if(!id) return res.json({message: 'ID not found in query body'});

  emitter.emit('findUser', id)
  res.json({message: 'ok'})
});

module.exports = router;
