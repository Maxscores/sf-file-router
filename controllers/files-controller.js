var jsforce = require('jsforce');
var conn = new jsforce.Connection({
  loginUrl: 'https://test.salesforce.com'
});
var fs = require('fs')

// var b64EncodeUnicode = require('b64EncodeUnicode')

class FilesController {
  uploadFile(req, res, next) {
    conn.login(req.params.sfId, req.params.sfPW, function(err, sfRes) {
      if (err) {
        res.send(err)
      } else {
        var sessionId = sfRes.accessToken
        var fileName = 'test.txt'
        var fileString = fs.readFileSync('./' + fileName)
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
                'FirstPublishLocationId': req.params.parentId,
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
