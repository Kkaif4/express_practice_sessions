import fs from 'fs';
import path from 'path';

export const fileNameCheck = (req, res, next) => {
  const { fileName } = req.params;
  //regex expression literal. it check the file name only contains letters, underscore and hyphen
  if (
    !/^[a-zA-Z0-9_-]+$/.test(fileName) ||
    fileName === 'undefined' ||
    fileName === 'null' ||
    typeof fileName !== 'string' ||
    fileName.trim() === ''
  ) {
    return next(new Error('Invalid file name'));
  }
  next();
};

export const dataValidation = (req, res, next) => {
  const { data } = req.body || {};
  if (
    !data ||
    data === 'undefined' ||
    data === 'null' ||
    data.toString().trim() === ''
  ) {
    return next(new Error('trying to write invalid data'));
  }
  next();
};

export const existFile = (req, res, next) => {
  const { fileName } = req.params;
  const filePath = path.resolve('./New_Files', `${fileName}.txt`);
  const existFile = fs.existsSync(filePath);

  //checks for the file. is already exist it throws the error. otherwise continues to next
  if (existFile) {
    return next(
      new Error(`${fileName}.txt already exist, try creating new file`)
    );
  }
  next();
};

export const fileNotFound = (req, res, next) => {
  const { fileName } = req.params;
  const filePath = path.resolve('./New_Files', `${fileName}.txt`);
  const existFile = fs.existsSync(filePath);

  //checks for the file. is already exist it throws the error. otherwise continues to next
  if (!existFile) {
    return next(
      new Error(`${fileName}.txt file not found, try creating new file`)
    );
  }
  next();
};
