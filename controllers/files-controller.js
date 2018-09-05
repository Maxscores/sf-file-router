var jsforce = require('jsforce');
var conn = new jsforce.Connection({
  loginUrl: 'https://test.salesforce.com'
});
var fs = require('fs')

// var b64EncodeUnicode = require('b64EncodeUnicode')

class FilesController {
  uploadFile(req, res, next) {
    conn.login(req.body.username, req.body.token, function(err, sfRes) {
      if (err) {
        res.send(err)
      } else {
        var sessionId = sfRes.accessToken
        var fileName = req.body.fileName
        // var fileString = req.body.fileContents
        var fileString = fs.readFileSync(req.body.fileContents)
        var b64TestFile = Buffer.from(fileString).toString('base64')
        conn.requestPost(
          '/services/data/v43.0/composite/',
          {
            'allOrNone': true,
            'compositeRequest': [{
              'method': 'POST',
              'url': '/services/data/v43.0/sobjects/ContentVersion',
              'referenceId' : 'newFile',
              'body': {
                'FirstPublishLocationId': req.body.parentId,
                'Title': fileName,
                'PathOnClient': fileName,
                'VersionData': b64TestFile,
                'Description': 'this is a test file'
              }
            }]
          }
        ).then(response => {
          res.send(response)
        })
      }
    })
  }
}

module.exports = FilesController
