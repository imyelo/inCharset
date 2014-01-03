;(function (name, definition) {
  // this is considered "safe":
  var hasDefine = typeof define === 'function',
    // hasDefine = typeof define === 'function',
    hasExports = typeof module !== 'undefined' && module.exports;

  if (hasDefine) {
    // AMD Module or CMD Module
    define(definition);
  } else if (hasExports) {
    // Node.js Module
    module.exports = definition();
  } else {
    // Assign to common namespaces or simply the global object (window)
    this[name] = definition();
  }
})('test-base', function (require, exports, module) {
  return function (inCharset) {
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
      describe('abort', function () {
        it('should be aborted', function (done) {
          var counter = 0;
          var tap = function () {
            if (++counter === 2) {
              done();
            }
          };
          var req = inCharset.get('中', 'gbk', function (str) {
            throw 'it should be aborted';
          }, function (err) {
            expect(err).to.be.equal('abort');
            tap();
          });
          req.abort();
          req = inCharset.get('文', 'gbk', function (str) {
            throw 'it should be custom message';
          }, function (err) {
            expect(err).to.be.equal('custom message');
            tap();
          });
          req.abort('custom message');
        });
        it('should be not emitted twice', function (done) {
          var counter = 0;
          var tap = function () {
            if (++counter === 2) {
              throw 'it should be not emitted twice';
            }
          };
          var req = inCharset.get('中', 'gbk', function (str) {
            throw 'it should be aborted';
          }, function (err) {
            expect(err).to.be.equal('abort');
            tap();
          });
          req.abort();
          req.abort();
          setTimeout(function () {
            done();
          }, 400);
        });
        it('should be not emitted after success', function (done) {
          var counter = 0;
          var tap = function () {
            if (++counter === 2) {
              throw 'should be not emitted after success';
            }
          };
          var req = inCharset.get('中', 'gbk', function (str) {
            expect(str).to.be.equal('%D6%D0');
            tap();
          }, function (err) {
            expect(err).to.be.equal('abort');
            tap();
          });
          setTimeout(function () {
            req.abort();
          }, 200);
          setTimeout(function () {
            done();
          }, 1000);
        });
      });
      describe('timeout', function () {
        it('should be timeout', function (done) {
          var counter = 0;
          var tap = function () {
            if (++counter === 2) {
              done();
            }
          };
          inCharset.options({timeout: 0});
          inCharset.get('中', 'gbk', function (str) {
            throw 'it should be timeout';
          }, function (err) {
            expect(err).to.be.equal('timeout');
            tap();
          });
          inCharset.get('文', 'gbk', function (str) {
            throw 'it should be timeout';
          }, function (err) {
            expect(err).to.be.equal('timeout');
            tap();
          });
          inCharset.options({timeout: 10000});
        });
        it('should be not emitted timeout after success', function (done) {
          var counter = 0;
          var tap = function () {
            if (++counter === 2) {
              throw 'should be not emitted timeout after success';
            }
          };
          inCharset.options({timeout: 600});
          inCharset.get('中', 'gbk', function (str) {
            expect(str).to.be.equal('%D6%D0');
            tap();
          }, function (err) {
            expect(err).to.be.equal('timeout');
            tap();
          });
          setTimeout(function () {
            done();
          }, 800);
          inCharset.options({timeout: 10000});
        });
        it('should be not emitted timeout after abort', function (done) {
          var counter = 0;
          var tap = function () {
            if (++counter === 2) {
              throw 'should be not emitted timeout after abort';
            }
          };
          var req;
          inCharset.options({timeout: 600});
          req = inCharset.get('中', 'gbk', function (str) {
            expect(str).to.be.equal('%D6%D0');
            tap();
          }, function (err) {
            tap();
          });
          req.abort();
          setTimeout(function () {
            done();
          }, 800);
          inCharset.options({timeout: 10000});
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
      });
    });
  };
});