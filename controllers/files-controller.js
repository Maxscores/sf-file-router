var jsforce = require('jsforce');
var conn = new jsforce.Connection({
  loginUrl: 'https://test.salesforce.com'
});



class FilesController {
  post(req, res, next) {
    res.send('hello world')
    // res.send(sfResponse)

  }

  get(req, res, next) {
    conn.login(req.params.sf_id, req.params.sf_pw, function(err, sfRes) {
      if (err) {
        res.send(err)
      } else {
        if (err) {
          res.send(err)
        } else {
          conn.query('SELECT Id, Name FROM Account LIMIT 10', function(err, sfRes) {
            res.send(sfRes)
          })
        }
      }
    })
  }
}

module.exports = FilesController
