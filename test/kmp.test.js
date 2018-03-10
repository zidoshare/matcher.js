var kmp = require('../lib/kmp.js')
var expect = require('chai').expect

describe('kmp finderFirst方法测试', function () {
  it('在目标串 uyabcgdrhr 中 查找 abc 子串的位置处于2', function () {
    var finder = new kmp('abc')
    expect(finder.findFirst('uyabcgdrhr')).to.be.equals(2)
  })
})

describe('kmp finderAll方法测试', function () {
  it('在目标串 uyabcgdabcbolibyfsuvabcajpueiwfbh 中 查找 abc 子串的位置处于2,7,20', function () {
    var finder = new kmp('abc')
    var result = finder.findAll('uyabcgdabcbolibyfsuvabcajpueiwfbh')
    expect(result).to.be.an('array').that.include.members([2, 7, 20])
  })
})