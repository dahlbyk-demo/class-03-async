'use strict';

const fs = require('fs');
const EOL = require('os').EOL;

const copyFile = require('../copy-file-promise');

let fileToRead = `${__dirname}/../files/2.txt`;
const generateFileToWrite = () => {
  var random = Math.random().toString().replace('.', '');
  return `${__dirname}/../files/output/${random}.txt`;
};

describe('Copy File Module', () => {
  it('calls callback with error for missing readFile', done => {
    let result = copyFile('missingFile', 'fileToWrite', (err, data) => {
      expect(err).toBeDefined();
      done();
    });

    expect(result).toBeUndefined();
  });

  it('calls callback with data from readFile', done => {
    let fileToWrite = generateFileToWrite();
    copyFile(fileToRead, fileToWrite, (err, data) => {
      expect(err).toBeFalsy();
      expect(data).toBeDefined();
      // console.log(data); // shows newline, so either trim or compare with EOL
      expect(data.toString().trim()).toBe('File 2 Contents');
      expect(data.toString()).toBe(`File 2 Contents${EOL}`);
      done();
    });
  });

  it('creates fileToWrite', done => {
    let fileToWrite = generateFileToWrite();
    console.log(fileToWrite);

    copyFile(fileToRead, fileToWrite, (err, data) => {
      expect(err).toBeFalsy();
      expect(data).toBeDefined();

      fs.access(fileToWrite, fs.constants.F_OK, (err) => {
        if (err) {
          throw err;
        } 
        else {
          done();
        }
      });
    });
  });

  it('fails on fileToWrite into missing directory', done => {
    var badFileToWrite = `${__dirname}/this-is-missing/test.txt`;

    copyFile(fileToRead, badFileToWrite, (err, data) => {
      expect(data).toBeUndefined();
      expect(err).toBeTruthy();
      done();
    });
  });
});
