var ac = require('../lib/ac.js')
var expect = require('chai').expect
describe('ac finderFirst方法测试', function () {
  it('在目标串 huisabcasfesfbcpjpirfjyluibedf 中 查找 abc 子串的位置处于4找到的第一个模式串是abc', function () {
    var finder = new ac(['abc', 'bc', 'jy', 'edf'])
    expect(finder.findFirst('huisabcasfesfbcpjpirfjyluibedf')).to.own.include({
      mode: 'abc',
      start: 4,
    })
  })
})