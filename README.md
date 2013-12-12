# inCharset
[![Codeship](https://www.codeship.io/projects/2f2959e0-4462-0131-b090-028493a8b6f3/status)](https://www.codeship.io/projects/10770)
[![Build Status](https://travis-ci.org/imyelo/inCharset.png?branch=master)](https://travis-ci.org/imyelo/inCharset)

## 介绍
inCharset解决了前端中不同编码的传递问题，也就是对字符串进行不同编码的urlencode。典型的案例如：在一个utf8编码的网页中，发送请求到另一个gbk编码的接口。  


**代码的原始拷贝和思路来自[zciii](http://zciii.com/blogwp/front-end-urldecode-gbk/)。**


## 用法
inCharset可以在requirejs或seajs下使用，即``require('inCharset')``。  
其他情况，则会将inCharset暴露到全局(window)中去，即``window.inCharset``。  

### options
在使用inCharset前，可以通过``require('inCharset').options(opts)``对其进行一些设置。
#### optionns.action
默认值为'./getEncodeStr.html'。请务必将该值设置为[getEncodeStr.html]()在当前网页的相对路径（或绝对路径）。
#### options.namespace
默认值为'_inCharset'。inCharset在实现时会通过全局变量进行传递，而这些全局变量都会被包在以该参数命名的变量下。
#### options.iframeName
默认值为'_urlEncode_iframe_'。inCharset在实现时会借助于一个iframe，而这个iframe的name值将以该参数作为前缀命名。

### get
get方法需要三个参数，分别是需要转码的字符串、目标转码类型、回调函数。
具体可参考**演示**

## 演示
### 对字符进行不同编码的urlencode。

``` js
inCharset.get('中文', 'utf8', function (str) {
  console.log(str === '%E4%B8%AD%E6%96%87');
});
inCharset.get('中文', 'gbk', function (str) {
  console.log(str === '%D6%D0%CE%C4');
});
inCharset.get('中文', 'big5', function (str) {
  console.log(str === '%A4%A4%A4%E5');
});
```

### 设置getEncodeStr.html的地址

``` js
inCharset.options({action: '../../libs/getEncodeStr.html'});
inCharset.get('中文', 'gbk', function (str) {
  console.log(str === '%D6%D0%CE%C4');
});
```

### 你也可以链式调用

``` js
inCharset
  .options({action: '../../libs/getEncodeStr.html'})
  .get('中', 'gbk', function (str) {
    console.log(str === '%D6%D0');
  })
  .get('文', 'gbk', function (str) {
    console.log(str === '%CE%C4');
});
```

## License
MIT