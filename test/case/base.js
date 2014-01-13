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
      describe('long text', function () {
        var text = '镜子中看见一张陌生的脸' + '/t' +
                      '那眼神如此黯淡 ' + '/t' +
                      '笑一笑只牵动苦涩的嘴角' + '/t' +
                      '我的寂寞谁知道 ' + '/t' +
                      '' + '/t' +
                      '像条船在海上飘' + '/t' +
                      '北斗星也看不到 ' + '/t' +
                      '谁能够扬起了帆' + '/t' +
                      '远远离开这黑潮 ' + '/t' +
                      '' + '/t' +
                      'angel angel 盼望你在我身边 ' + '/t' +
                      'angel angel 请你紧紧抓住我的手 ' + '/t' +
                      '' + '/t' +
                      '有时候我想不会有人了解' + '/t' +
                      '心里面藏著的痛 ' + '/t' +
                      '我害怕用真心面对这世界' + '/t' +
                      '只好越来越沉默 ' + '/t' +
                      '' + '/t' +
                      '一个人在人海漂' + '/t' +
                      '说话的人找不到 ' + '/t' +
                      '谁给我温柔(拥抱我)拥抱' + '/t' +
                      '当我感觉心快要碎了 ' + '/t' +
                      '' + '/t' +
                      'angel angel 盼望你在我身边 ' + '/t' +
                      'angel angel 是否听见我在呼唤你 ' + '/t' +
                      '' + '/t' +
                      '能不能告诉孤单疲惫的我你永远为我守候 ' + '/t' +
                      'angel angel 请你留在我的身边 ' + '/t' +
                      'angel angel 请你不要放开我的手';
        var textGBK = '%BE%B5%D7%D3%D6%D0%BF%B4%BC%FB%D2%BB%D5%C5%C4%B0%C9%FA%B5%C4%C1%B3%2Ft%C4%C7%D1%DB%C9%F1%C8%E7%B4%CB%F7%F6%B5%AD+%2Ft%D0%A6%D2%BB%D0%A6%D6%BB%C7%A3%B6%AF%BF%E0%C9%AC%B5%C4%D7%EC%BD%C7%2Ft%CE%D2%B5%C4%BC%C5%C4%AF%CB%AD%D6%AA%B5%C0+%2Ft%2Ft%CF%F1%CC%F5%B4%AC%D4%DA%BA%A3%C9%CF%C6%AE%2Ft%B1%B1%B6%B7%D0%C7%D2%B2%BF%B4%B2%BB%B5%BD+%2Ft%CB%AD%C4%DC%B9%BB%D1%EF%C6%F0%C1%CB%B7%AB%2Ft%D4%B6%D4%B6%C0%EB%BF%AA%D5%E2%BA%DA%B3%B1+%2Ft%2Ftangel+angel+%C5%CE%CD%FB%C4%E3%D4%DA%CE%D2%C9%ED%B1%DF+%2Ftangel+angel+%C7%EB%C4%E3%BD%F4%BD%F4%D7%A5%D7%A1%CE%D2%B5%C4%CA%D6+%2Ft%2Ft%D3%D0%CA%B1%BA%F2%CE%D2%CF%EB%B2%BB%BB%E1%D3%D0%C8%CB%C1%CB%BD%E2%2Ft%D0%C4%C0%EF%C3%E6%B2%D8%D6%F8%B5%C4%CD%B4+%2Ft%CE%D2%BA%A6%C5%C2%D3%C3%D5%E6%D0%C4%C3%E6%B6%D4%D5%E2%CA%C0%BD%E7%2Ft%D6%BB%BA%C3%D4%BD%C0%B4%D4%BD%B3%C1%C4%AC+%2Ft%2Ft%D2%BB%B8%F6%C8%CB%D4%DA%C8%CB%BA%A3%C6%AF%2Ft%CB%B5%BB%B0%B5%C4%C8%CB%D5%D2%B2%BB%B5%BD+%2Ft%CB%AD%B8%F8%CE%D2%CE%C2%C8%E1%28%D3%B5%B1%A7%CE%D2%29%D3%B5%B1%A7%2Ft%B5%B1%CE%D2%B8%D0%BE%F5%D0%C4%BF%EC%D2%AA%CB%E9%C1%CB+%2Ft%2Ftangel+angel+%C5%CE%CD%FB%C4%E3%D4%DA%CE%D2%C9%ED%B1%DF+%2Ftangel+angel+%CA%C7%B7%F1%CC%FD%BC%FB%CE%D2%D4%DA%BA%F4%BB%BD%C4%E3+%2Ft%2Ft%C4%DC%B2%BB%C4%DC%B8%E6%CB%DF%B9%C2%B5%A5%C6%A3%B1%B9%B5%C4%CE%D2%C4%E3%D3%C0%D4%B6%CE%AA%CE%D2%CA%D8%BA%F2+%2Ftangel+angel+%C7%EB%C4%E3%C1%F4%D4%DA%CE%D2%B5%C4%C9%ED%B1%DF+%2Ftangel+angel+%C7%EB%C4%E3%B2%BB%D2%AA%B7%C5%BF%AA%CE%D2%B5%C4%CA%D6';
        it('simple case', function (done) {
          inCharset.get(text, 'gbk', function (str) {
            expect(str).to.be.equal(textGBK);
            done();
          });
        });
        it('double length', function (done) {
          inCharset.get(text + text, 'gbk', function (str) {
            expect(str).to.be.equal(textGBK + textGBK);
            done();
          });
        });
        it('x99 length', function (done) {
          var multi = function (input, length) {
            var str, i;
            str = '';
            for (i = 0, length; i < length; i++) {
              str += input;
            }
            return str;
          };
          inCharset.get(multi(text, 99), 'gbk', function (str) {
            expect(str).to.be.equal(multi(textGBK, 99));
            done();
          });
        });
      });
    });
  };
});