define(function (require, exports, module) {
  var inCharset = require('../../../src/inCharset');
  inCharset.options({action: '../../src/getEncodeStr.html'});

  require('./case/base/index')(inCharset);

  window.inCharset = inCharset;


  if (window.mochaPhantomJS) {
    mochaPhantomJS.run();
  } else {
    mocha.run();
  }
});