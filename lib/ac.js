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

ac.prototype.findAll = function (target) {
  var results = []

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
      results.push({
        mode: node.mode,
        start: i - node.mode.length + 1
      })
      if (i == 0 || node == root) {
        continue
      }

      i = i - node.mode.length + 1
      node = this.failure[node.state]
    }
  }
  return results
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

module.exports = ac