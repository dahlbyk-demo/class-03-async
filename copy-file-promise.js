'use strict';

const fs = require('fs');
const util = require('util');

const fsReadFile = util.promisify(fs.readFile);
const fsWriteFile = util.promisify(fs.writeFile);

module.exports = function(fileToRead, fileToWrite) {
  return fsReadFile(fileToRead)
    .then(data => {
      return fsWriteFile(fileToWrite, data)
        .then(() => Promise.resolve(data));
    });
};
