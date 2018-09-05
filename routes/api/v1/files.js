var express = require('express');
var router = express.Router();
var FilesController = require('../../../controllers/files-controller')

var filesController = new FilesController

/* GET users listing. */
router.get('/', filesController.uploadFile);
//
router.post('/', filesController.uploadFile);

module.exports = router;
