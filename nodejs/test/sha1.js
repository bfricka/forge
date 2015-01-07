(function() {

function Tests(ASSERT, MD, SHA1, UTIL) {
  describe('sha1', function() {
    it('should digest the empty string', function() {
      var md = MD.createMessageDigest('sha1');
      ASSERT.equal(
        md.digest().toHex(), 'da39a3ee5e6b4b0d3255bfef95601890afd80709');
    });

    it('should digest "abc"', function() {
      var md = MD.createMessageDigest('sha1');
      md.update('abc', 'utf8');
      ASSERT.equal(
        md.digest().toHex(), 'a9993e364706816aba3e25717850c26c9cd0d89d');
    });

    it('should digest "The quick brown fox jumps over the lazy dog"', function() {
      var md = MD.createMessageDigest('sha1');
      md.update('The quick brown fox jumps over the lazy dog', 'utf8');
      ASSERT.equal(
        md.digest().toHex(), '2fd4e1c67a2d28fced849ee1bb76e7391b93eb12');
    });

    it('should digest "c\'\u00e8"', function() {
      var md = MD.createMessageDigest('sha1');
      md.update("c\'\u00e8", 'utf8');
      ASSERT.equal(
        md.digest().toHex(), '98c9a3f804daa73b68a5660d032499a447350c0d');
    });

    it('should digest "THIS IS A MESSAGE"', function() {
      var md = MD.createMessageDigest('sha1');
      md.start();
      md.update('THIS IS ', 'utf8');
      md.update('A MESSAGE', 'utf8');
      // do twice to check continuing digest
      ASSERT.equal(
        md.digest().toHex(), '5f24f4d6499fd2d44df6c6e94be8b14a796c071d');
      ASSERT.equal(
        md.digest().toHex(), '5f24f4d6499fd2d44df6c6e94be8b14a796c071d');
    });

    it('should digest a long message', function() {
      // Note: might be too slow on old browsers
      var md = MD.createMessageDigest('sha1');
      md.update(UTIL.fillString('a', 1000000), 'utf8');
      ASSERT.equal(
        md.digest().toHex(), '34aa973cd4c4daa4f61eeb2bdbad27316534016f');
    });
  });
}

// check for AMD
var forge = {};
if(typeof define === 'function') {
  define([
    'forge/md',
    'forge/sha1',
    'forge/util'
  ], function(MD, SHA1, UTIL) {
    Tests(
      // Global provided by test harness
      ASSERT,
      MD(forge),
      SHA1(forge),
      UTIL(forge)
    );
  });
} else if(typeof module === 'object' && module.exports) {
  // assume NodeJS
  Tests(
    require('assert'),
    require('../../js/md')(forge),
    require('../../js/sha1')(forge),
    require('../../js/util')(forge));
}

})();
