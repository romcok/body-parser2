var json = require('./json')
var JSONbig = require('json-bigint')

/**
 * Module exports.
 */

module.exports = jsonBigInt

/**
 * Create a middleware to parse JSON bodies with BigInt support.
 *
 * @param {object} [options]
 * @return {function}
 * @public
 */

function jsonBigInt (options) {
  var opts = {}

  // exclude type option
  if (options) {
    for (var prop in options) {
      if (prop !== 'storeAsString') {
        opts[prop] = options[prop]
      }
    }
  }

  opts.parser = JSONbig({
    strict: options && options.strict ? options.strict : false,
    storeAsString: options && options.storeAsString ? options.storeAsString : false
  }).parse

  return json(opts)
}
