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

describe('ac findAll方法测试',function () {
  it('在目标串 huisabcasfesfbcpjpirfjyluibedf 中 查找到的结果测试 出2个结果', function () {
    var finder = new ac(['abc', 'adc', 'jy', 'edf'])
    var results = finder.findAll('1abcegadc')
    console.log(results)
    expect(results).to.be.an('array').to.have.length.least(2)
  })
})