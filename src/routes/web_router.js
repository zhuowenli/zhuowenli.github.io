const express = require('express');
const router = express.Router();

const home = require('./home');
const config = require('../config');

// home
router.get('/', home.index);

module.exports = router;