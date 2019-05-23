'use strict';

const copyFile = require('../copy-file');

describe('Copy File Module', () => {
  it('calls callback with error for missing readFile', done => {
    let result = copyFile('missingFile', 'fileToWrite', (err, data) => {
      expect(err).toBeDefined();
      done();
    });

    expect(result).toBeUndefined();
  });

});
