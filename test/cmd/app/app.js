define(function (require, exports, module) {
  var inCharset = require('../../../libs/inCharset');
  inCharset.options({action: '../../libs/getEncodeStr.html'});

  require('./case/base')(inCharset);

  mocha.globals(['_inCharset']);
  if (window.mochaPhantomJS) {
    mochaPhantomJS.run();
  } else {
    mocha.run();
  }
});