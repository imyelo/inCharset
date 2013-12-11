define(function (require, exports, module) {
  var inCharset = require('../../../libs/inCharset');
  inCharset.options({action: '../../libs/getEncodeStr.html'});

  require('./case/base/index')(inCharset);

  if (window.mochaPhantomJS) {
    mochaPhantomJS.globals(['_inCharset']);
    mochaPhantomJS.run();
  } else {
    mocha.globals(['_inCharset']);
    mocha.run();
  }
});