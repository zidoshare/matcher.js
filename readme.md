# 字符串匹配算法相关js实现

* ac算法

* kmp算法

# 使用

安装 `npm install zitcher.js`

```javascript

  var zitcher = require('zitcher.js')

  //create by pattern 
  //如果传入字符串，会自动采用kmp算法，获取kmp对象，此对象重复使用
  var finder = zitcher('abc')
  var result = finder.findFirst('hcniufvfabcfgrthrt') //返回number
  //如果是传入字符串，会采用ac自动机算法
  var finder2 = zitcher(['abc','def'])
  result = finders.findFirst('ouabcpjeuirfddef')
  console.log(resultArr[i].mode,resultArr[i].start)

```

## api

findFirst() //查找第一次出现的子串

findAll() // 查找所有出现的子串

 

# 测试

> npm test

# 构建 

打包压缩

> npm run build