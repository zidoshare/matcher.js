var kmp = require('./src/kmp.js')
var ac = require('./src/ac.js')
function matcher(pattern) {
  if (typeof pattern === 'string') {
    return new kmp(pattern)
  } else {
    return new ac(pattern)
  }
}

module.exports = matcher