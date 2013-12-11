;(function (name, definition) {
  // this is considered "safe":
  var hasDefine = typeof define === 'function';

  if (hasDefine) {
    // AMD Module or CMD Module
    define(definition);
  } else {
    // Assign to common namespaces or simply the global object (window)
    this[name] = definition();
  }
})('inCharset', function(require, exports, module) {
  var InCharset = function () {
    this._options = {
      // the location of getEncodeStr.html
      action: './getEncodeStr.html',
      // this variable will be setted in window
      namescape: '_inCharset',
      // the name of iframe
      iframeName: '_urlEncode_iframe_',
    };
    return this;
  };
  InCharset.prototype.initNamescape = function () {
    var ns = this._options.namescape;
    if (!window[ns]) {
      window[ns] = {
        callback: {}
      };
    }
    return this;
  };
  InCharset.prototype.options = function (opts) {
    if (typeof opts === 'object') {
      if (opts.action) {
        this._options.action = opts.action;
      }
      if (opts.namescape) {
        this._options.namescape = opts.namescape;
      }
      if (opts.iframeName) {
        this._options.iframeName = opts.iframeName;
      }
    }
    return this;
  };
  InCharset.prototype.get = function(str, charset, callback) {
    var self = this;
    // location.search would be '?id=' + id + '&str=' + str
    var strInput, idInput, form, iframe, id;
    // just get a random value
    id = (new Date()).getTime().toString(32) + '.' + Math.floor(Math.random() * 1024).toString(32);
    idInput = document.createElement('input');
    strInput = document.createElement('input');
    form = document.createElement('form');
    iframe = document.createElement('iframe');
    idInput.type = 'hidden';
    idInput.name = 'id';
    idInput.value = id;
    strInput.type = 'hidden';
    strInput.name = 'str';
    strInput.value = str;
    form.method = 'get';
    form.style.display = 'none';
    form.acceptCharset = charset;
    form.appendChild(idInput);
    form.appendChild(strInput);
    form.target = self._options.iframeName;
    document.body.appendChild(form);
    iframe.setAttribute('name', self._options.iframeName);
    iframe.style.display = 'none';
    iframe.width = "0";
    iframe.height = "0";
    iframe.scrolling = "no";
    iframe.allowtransparency = "true";
    iframe.frameborder = "0";
    iframe.src = 'about:blank';
    document.body.appendChild(iframe);
    self.initNamescape();
    window[self._options.namescape]['callback'][id] = function (str) {
      callback(str);
      delete window[self._options.namescape]['callback'][id];
    };
    form.action = self._options.action;
    form.submit();
    setTimeout(function() {
      form.parentNode.removeChild(form);
      if (typeof iframe !== 'undefined') {
        iframe.parentNode.removeChild(iframe);
      }
    }, 500000);
    return self;
  };

  module.exports = new InCharset();
});