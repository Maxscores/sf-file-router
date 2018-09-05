var express = require('express');
var router = express.Router();
var FilesController = require('../../../controllers/files-controller')

var filesController = new FilesController

/* GET users listing. */
router.get('/:sf_id/:sf_pw', filesController.get);
//
// router.post('/:id', function(req, res, nest) {
//
// })

module.exports = router;
