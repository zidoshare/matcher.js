# 字符串匹配算法相关js实现

* ac算法

* kmp算法

# 使用

安装 `npm install zitcher`

```javascript

  var zitcher = require('zitcher')

  //create by pattern 
  //如果传入字符串，会自动采用kmp算法，获取kmp对象，此对象重复使用
  var finder = zitcher('abc')
  var result = finder.findFirst('hcniufvfabcfgrthrt') //返回number
  finder.findAll('vdrfstfbdfsdabcagreghrthbng') //array of some results,shape like finder.findFirst()    {mode:string,start:number}
  //如果是传入数组，会采用ac自动机算法
  var finder2 = zitcher(['abc','def'])
  result = finder2.findFirst('ouabcpjeuirfddef')
  console.log(result.mode,result.start)

  finder2.findAll('aldbabcladwnedefdninjabc') //array of some results,shape like finder.findFirst()    {mode:string,start:number}

```

## api

findFirst() //查找第一次出现的子串

findAll() // 查找所有出现的子串,返回数组，每个数据与findFirst格式相同

 
# 测试

> npm test

# 构建 

打包压缩

> npm run build