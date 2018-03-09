/**
 * kmp算法的js实现
 * 使用方式:
 * var finder =  new kmp(partten)
 * finder.findAll(target)
 * finder.findFirst(target)
 * @param {string} str 模式串
 */
function kmp(str) {
  var len = str.length
  var next = new Array(len)
  next[0] = -1
  var j = -1
  for (var i = 1; i < len; i++) {
    while (j > -1 && str.charAt(j + 1) != str.charAt(i)) {
      j = next[j]
    }
    if (str.charAt(j + 1) == str.charAt(i)) {
      j++
    }
    next[i] = j
  }
  this.next = next
  this.keyword = str
}

kmp.prototype.findFirst = function (target) {
  var j = -1
  var targetLen = target.length
  var keyLen = this.keyword.length
  for (var i = 0; i < targetLen; i++) {
    while (j > -1 && this.keyword.charAt(j + 1) != target.charAt(i)) {
      j = this.next[j]
    }
    if (this.keyword.charAt(j + 1) == target.charAt(i)) {
      j++
    }
    if (j == keyLen - 1)
      return i - keyLen + 1
  }
  return -1
}

kmp.prototype.findAll = function (target) {
  var result = []
  var j = -1
  var targetLen = target.length
  var keyLen = this.keyword.length
  for (var i = 1; i < targetLen; i++) {
    while (j > -1 && this.keyword.charAt(j + 1) != target.charAt(i)) {
      j = this.next[j]
    }
    if (this.keyword.charAt(j + 1) == target.charAt(i)) {
      j++
    }
    if (j == keyLen - 1) {
      result.push(i - keyLen + 1)
      j = -1
    }
  }
  return result
}

module.exports = kmp