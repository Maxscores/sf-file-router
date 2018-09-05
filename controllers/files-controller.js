var jsforce = require('jsforce');
var conn = new jsforce.Connection({
  loginUrl: 'https://test.salesforce.com'
});
var fs = require('fs')

// var b64EncodeUnicode = require('b64EncodeUnicode')

class FilesController {
  uploadFile(req, res, next) {
    conn.login(req.headers.username, req.headers.token, function(err, sfRes) {
      console.log(req.headers);
      if (err) {
        res.send(sfRes)
      } else {
        var sessionId = sfRes.accessToken
        var fileName = req.headers.filename
        // var fileName = 'test.txt'
        // var fileString = fs.readFileSync('./' + fileName)
        // var b64TestFile = Buffer.from(Object.keys(req.body)).toString('base64')
        // var b64TestFile = Buffer.from(req.file.buffer).toString('base64')
        var b64TestFile = req.body.file
        var request = {
          'method': 'POST',
          'url': '/services/data/v43.0/sobjects/ContentVersion',
          'referenceId' : 'newFile',
          'body': {
            'FirstPublishLocationId': req.headers.parentid,
            'Title': fileName,
            'PathOnClient': fileName,
            'VersionData': b64TestFile,
            'Description': 'this is a test file'
          }
        }
        conn.requestPost(
          '/services/data/v43.0/composite/',
          {
            'allOrNone': true,
            'compositeRequest': [request]
          }
        ).then(response => {
          res.send(response)
        })
      }
    })
  }
}

module.exports = FilesController
