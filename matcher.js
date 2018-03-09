(function () {
  /**
 * 多模式串匹配，ac自动机的js实现
 * @param {array} modes 模式串数组
 */
  function ac(modes) {
    var root = new AcNode(0)
    this.lastState = 1
    //通过字符串数组构建trie结构
    for (var i = 0; i < modes.length; i++) {
      var mode = modes[i]
      var arr = mode.split('')
      var last = root
      for (var j = 0; j < arr.length; j++) {
        var ch = arr[j]
        var node = new AcNode(this.lastState++)
        last.next(ch, node)
        last = node
      }
      last.finish = true
      last.mode = mode
    }
    //构建failure表做失陪跳转
    var failure = new Array(this.lastState)
    var queue = []
    var nextChars = root.nextChars()
    for (i = 0; i < nextChars.length; i++) {
      var nextNode = root.next(nextChars[i])
      failure[nextNode.state] = root
      queue.push(nextNode)
    }
    while (queue.length != 0) {
      var known = queue.shift()
      nextChars = known.nextChars()
      for (j = 0; j < nextChars.length; j++) {
        var nxt = known.next(nextChars[j])
        last = failure[known.state]
        while (last != root && last.next(nextChars[j])) {
          last = failure[last.state]
        }
        if (!last.next[nextChars[j]]) {
          failure[nxt.state] = root
        } else {
          failure[nxt.state] = last.next[nextChars[j]]
        }
        queue.push(nxt)
      }
    }
    this.root = root
    this.failure = failure
  }
  /**
   * 查找第一个出现的模式串
   * @param {string} target 目标串
   */
  ac.prototype.findFirst = function (target) {
    var node = this.root
    var chars = target.split('')
    for (var i = 0; i < chars.length; i++) {
      var next = node.next(chars[i])
      if (next != null) {
        node = next
      } else {
        if (i == 0 || node == this.root) {
          continue
        }
        --i
        node = this.failure[node.state]
      }
      if (node.finish) {
        return {
          mode: node.mode,
          start: i - node.mode.length + 1
        }
      }
    }
  }

  /**
   * acTrie的节点
   * @param {number} state 状态
   */
  function AcNode(state) {
    this.state = state
    this.finish = false
  }

  /**
   * 添加/获取下一个节点
   * @param {char} ch 下一个字符
   * @param {AcNode} node 下一个节点
   */
  AcNode.prototype.next = function (ch, node) {
    if (!this.nodes)
      this.nodes = {}
    if (node)
      this.nodes[ch] = node
    else
      return this.nodes[ch]
  }

  AcNode.prototype.nextChars = function () {
    var result = []
    for (var key in this.nodes) {
      if (this.nodes.hasOwnProperty(key)) {
        result.push(key)
      }
    }
    return result
  }

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

  var matcher = {
    kmp: kmp,
    ac: ac,
  }
  /* global define,module,window */
  if (typeof module !== 'undefined' && typeof exports === 'object') {
    module.exports = matcher
  } else if (typeof define === 'function' && (define.amd || define.cmd)) {
    define(function () { return matcher })
  } else {
    this.matcher = matcher
  }
}).call(function () {
  return this || (typeof window !== 'undefined' ? window : global)
})