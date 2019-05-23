'use strict';

const fs = require('fs');
const util = require('util');

const fsAccess = util.promisify(fs.access);

const EOL = require('os').EOL;

const copyFile = require('../copy-file-promise');

let fileToRead = `${__dirname}/../files/2.txt`;
const generateFileToWrite = () => {
  var random = Math.random().toString().replace('.', '');
  return `${__dirname}/../files/output/${random}.txt`;
};

describe('Copy File Promise Module', () => {
  it('calls callback with error for missing readFile', () => {
    var copyFileResultPromise = copyFile('missingFile', 'fileToWrite');

    return expect(copyFileResultPromise)
      .rejects.toBeDefined();
  });

  it('calls callback with data from readFile', () => {
    let fileToWrite = generateFileToWrite();

    return copyFile(fileToRead, fileToWrite)
      .then(data => {
        expect(data).toBeDefined();
        // console.log(data); // shows newline, so either trim or compare with EOL
        expect(data.toString().trim()).toBe('File 2 Contents');
        expect(data.toString()).toBe(`File 2 Contents${EOL}`);
      });
  });

  it('creates fileToWrite', () => {
    let fileToWrite = generateFileToWrite();
    console.log(fileToWrite);

    return copyFile(fileToRead, fileToWrite)
      .then((data) => {
        expect(data).toBeDefined();

        return fsAccess(fileToWrite, fs.constants.F_OK);
      });
  });

  it('fails on fileToWrite into missing directory', () => {
    var badFileToWrite = `${__dirname}/this-is-missing/test.txt`;

    return expect(copyFile(fileToRead, badFileToWrite))
      .rejects.toBeDefined();
  });
});
