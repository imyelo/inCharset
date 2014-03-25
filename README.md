# inCharset

> inCharset解决了前端中不同编码的传递问题，也就是对字符串进行不同编码的urlencode。典型的案例如：在一个utf8编码的网页中，发送请求到另一个只接受gbk编码的接口。  

> **代码的原始拷贝和思路来自[zciii](http://zciii.com/blogwp/front-end-urldecode-gbk/)。**

[![Build Status](https://travis-ci.org/imyelo/inCharset.png?branch=master)](https://travis-ci.org/imyelo/inCharset)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
[![Codeship](https://www.codeship.io/projects/2f2959e0-4462-0131-b090-028493a8b6f3/status)](https://www.codeship.io/projects/10770)

## 后端？
inCharset的实现借助了一个iframe以及一个html页面，因此并不适用于后端JS。如果你需要在Node.js中进行GBK的解码，除了使用[iconv-lite](https://github.com/ashtuchkin/iconv-lite)，也不妨参考[bound0的解决方案](https://github.com/imyelo/bound0-gbk)。

## 使用
inCharset可以在requirejs或seajs下使用，即``require('inCharset')``。  
其他情况，则会将inCharset暴露到全局(window)中去，即``window.inCharset``。  

### options
在使用inCharset前，可以通过``require('inCharset').options(opts)``对其进行部分设置。
#### optionns.action
默认值为'./getEncodeStr.html'。请务必将该值设置为[getEncodeStr.html]()在当前网页的相对路径（或绝对路径）。
#### options.namespace
默认值为'_inCharset'。inCharset的实现需要借助于全局变量，而这些全局变量都将存放在``window[options.namespace]``下，从而尽可能地保护其他全局变量。
#### options.iframeName
默认值为'_urlEncode_iframe_'。inCharset的实现需要借助一个iframe，而这个iframe的name值将以该参数作为前缀命名，请确保该值的唯一性。
#### options.timeout
默认值为10000， 单位毫秒。假定超过该时长仍未得到响应，则会调用失败的回调函数，并传入错误信息为``'timeout'``。

### get
``inCharset.get``带有四个参数，依次为需要转码的字符串(必须)、目标转码类型(必须)、成功回调函数、失败回调函数。
具体可参考**演示**

### abort
``inCharset.get``返回的对象中包含一个``abort``方法，该方法借鉴了jQuery.ajax的设计，通过它可以中断对应的``inCharset.get``请求。你也可以向``abort``方法的第一个参数传入自定义的错误信息，否则默认的错误信息将为``'abort'``。。

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

### 设置超时限制时长

``` js
inCharset.options({timeout: 5000});
inCharset.get('中', 'gbk', function (str) {
  console.log(str === '%D6%D0');
});
```

### 处理异常

``` js
var onSuccess = function (str) {
  console.log(str === '%D6%D0');
};
var onError = function (err) {
  console.error(err);
};
inCharset.get('中', 'gbk', onSuccess, onError);
```

### 中断未完成的inCharset.get请求

``` js
var onSuccess = function (str) {
  console.log(str === '%D6%D0');
};
var onError = function (err) {
  console.error(err);
};
var request = inCharset.get('中', 'gbk', onSuccess, onError);
request.abort();
// or request.abort('the message you want it be');
```

## 测试
由于inCharset会借助DOM元素实现其业务，所以建议直接使用浏览器打开``/test``目录下的Mocha测试页面进行测试。  
当然你也可以选择使用``grunt test``跳过浏览器测试。  

*如果在浏览器下测试，注意需要首先执行``grunt copy:test``将case同步到不同的方案底下。*

## License
MIT

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/imyelo/incharset/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

