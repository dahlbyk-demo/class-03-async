'use strict';

const fs = require('fs');
const util = require('util');

const fsReadFile = util.promisify(fs.readFile);
const fsWriteFile = util.promisify(fs.writeFile);

module.exports = async function(fileToRead, fileToWrite) {
  let data = await fsReadFile(fileToRead);
  await fsWriteFile(fileToWrite, data);
  return data;
};
