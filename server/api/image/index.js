'use strict';
var auth = require('../../auth/auth.service');
var express = require('express');
var controller = require('./image.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.upload);
router.delete('/:id', controller.destroy);

module.exports = router;
