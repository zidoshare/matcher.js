var kmp = require('./kmp.js')
var ac = require('./ac.js')
function matcher(pattern) {
  if (typeof pattern === 'string') {
    return new kmp(pattern)
  } else {
    return new ac(pattern)
  }
}

module.exports = matcher