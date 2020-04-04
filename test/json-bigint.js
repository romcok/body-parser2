var http = require('http')
var request = require('supertest')
var JSONbig = require('json-bigint')()

var bodyParser = require('..')

describe('bodyParser.jsonBigInt()', function () {
  it('should parse BigInt as number', function (done) {
    request(createServer())
      .post('/')
      .set('Content-Type', 'application/json')
      .send('{"bigint":281202370816247052}')
      .expect(200, '{"bigint":281202370816247052}', done)
  })

  it('should parse BigInt as string', function (done) {
    request(createServer({
      storeAsString: true
    }))
      .post('/')
      .set('Content-Type', 'application/json')
      .send('{"bigint":281202370816247052}')
      .expect(200, '{"bigint":"281202370816247052"}', done)
  })
})

function createServer (opts) {
  var _bodyParser = typeof opts !== 'function'
    ? bodyParser.jsonBigInt(opts)
    : opts

  return http.createServer(function (req, res) {
    _bodyParser(req, res, function (err) {
      if (err) {
        res.statusCode = err.status || 500
        res.end(err[req.headers['x-error-property'] || 'message'])
      } else {
        res.statusCode = 200
        res.end(JSONbig.stringify(req.body))
      }
    })
  })
}
