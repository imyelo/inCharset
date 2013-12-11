;(function (definition) {
  // this is considered "safe":
  var hasDefine = typeof define === 'function',
    // hasDefine = typeof define === 'function',
    hasExports = typeof module !== 'undefined' && module.exports;
  if (hasDefine) {
    // AMD Module or CMD Module
    define(definition);
  } else if (hasExports) {
    // Node.js Module
    definition(require, exports, module);
  } else {
    throw new Error('module required');
  }
})(function (require, exports, module) {
  module.exports = function (inCharset) {
    describe('base', function () {
      describe('charset', function () {
        it('utf8 to utf8', function (done) {
          inCharset.get('中文', 'utf8', function (str) {
            expect(str).to.be.equal('%E4%B8%AD%E6%96%87');
            done();
          });
        });
        it('utf8 to gbk', function (done) {
          inCharset.get('中文', 'gbk', function (str) {
            expect(str).to.be.equal('%D6%D0%CE%C4');
            done();
          });
        });
        it('utf8 to big5', function (done) {
          inCharset.get('中文', 'big5', function (str) {
            expect(str).to.be.equal('%A4%A4%A4%E5');
            done();
          });
        });
      });
      describe('use case', function () {
        it('multi tasks', function (done) {
          var counter = 0;
          var tap = function () {
            if (++counter === 2) {
              done();
            }
          };
          inCharset.get('中', 'gbk', function (str) {
            expect(str).to.be.equal('%D6%D0');
            tap();
          });
          inCharset.get('文', 'gbk', function (str) {
            expect(str).to.be.equal('%CE%C4');
            tap();
          });
        });
        it('chainable', function (done) {
          var counter = 0;
          var tap = function () {
            if (++counter === 2) {
              done();
            }
          };
          inCharset.get('中', 'gbk', function (str) {
            expect(str).to.be.equal('%D6%D0');
            tap();
          }).get('文', 'gbk', function (str) {
            expect(str).to.be.equal('%CE%C4');
            tap();
          });
        });
      });
    });
  };
});