(function (window, document) {
  var globals = ['_inCharset'];

  inCharset.options({action: '../../libs/getEncodeStr.html'});
  window['test-base'](inCharset);
  mocha.globals(globals);
  
  if (window.mochaPhantomJS) {
    mochaPhantomJS.run();
  } else {
    mocha.run();
  }
})(window, document);