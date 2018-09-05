var express = require('express');
// var multer  = require('multer');
// var storage = multer.memoryStorage();
// var upload = multer({ storage: storage })

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));

var router = express.Router();
var FilesController = require('../../../controllers/files-controller')

var filesController = new FilesController

/* GET users listing. */
router.get('/', filesController.uploadFile);
//
router.post('/', filesController.uploadFile);

module.exports = router;
