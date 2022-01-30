const express = require('express');
const router = express.Router();
const ctrl = require('./patent.ctrl');

router.get('/', ctrl.index);

module.exports = router;