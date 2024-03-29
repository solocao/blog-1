---
title: JSONparse-Unexpected-token分析汇总
date: 2019-06-24T16:57:33.000Z
tags: null
permalink: 2019-06-24-json-parse-error
---

问题描述: 微博第三方登陆成功之后返回 json 字符串,使用 JSON.parse()进行解析的时候出现下列报错.
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190115174034916.png)
**在明确数据确实有返回之后**,将问题确定为返回的 json 文件格式不正确,网上一番搜索尝试之后,解决了问题,特此记录
**情况一: 空格以及转义字符**

```js
JSON.parse('{"hello":"world"}'); //输出{hello: "world"}
JSON.parse('{"hello":"\\world"}'); //抛出异常,Unexpected token w in JSON at position 11
```

根据 world 前面的反斜杠数,得出的结果如下

```js
1个，"world"
2个，Error
3个，Error
4个，"\world"
5个，"\world"
6个，Error
7个，Error
8个，"\\world"
```

问题的根源就是 JavaScript 和 JSON 对转义字符的处理方式不同,引擎内部原理请看[这篇文章](https://zhuanlan.zhihu.com/p/31030352)

解决办法就是对这些空格以及转义字符进行替换.

```js
s = s
  .replace(/\\n/g, '\\n')
  .replace(/\\'/g, "\\'")
  .replace(/\\"/g, '\\"')
  .replace(/\\&/g, '\\&')
  .replace(/\\r/g, '\\r')
  .replace(/\\t/g, '\\t')
  .replace(/\\b/g, '\\b')
  .replace(/\\f/g, '\\f')
  .replace(/\//g, '/');
//移除不可打印的或者其他无效的json字符
s = s.replace(/[\u0000-\u0019]+/g, '');
var o = JSON.parse(s);
```

**情况二.文件头出现注释**: json 中不允许出现注释,检查手动删除即可

**情况三 html 字符串**:
排除上面两种可能的问题后,还是不能解决问题,开始二分定位错误,最终发现问题出在下面这个字段

```js
"source":"<a href="http://app.weibo.com/t/feed/5WDNEq" rel="nofollow">未通过审核应用</a>",
```

这个数据是第三方返回的,没法要求第三方做处理,考虑到不需要使用该字段,因此直接做了替换

```js
json.replace(/<a[\s]+[\d\D]*<\/a>/g, '');
```

**情况四. 返回的数据已经是对象**使用 typeof 进行校验,如果是 object 的话,就不必使用 JSON.parse 进行解析

参考:
https://zhuanlan.zhihu.com/p/31030352
https://stackoverflow.com/questions/22551586/write-html-string-in-json
https://stackoverflow.com/questions/14432165/uncaught-syntaxerror-unexpected-token-with-json-parse
