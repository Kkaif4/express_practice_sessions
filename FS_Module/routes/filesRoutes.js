import express from 'express';
import {
  dataValidation,
  existFile,
  fileNameCheck,
  fileNotFound,
} from '../middleware/validate.js';
import {
  createFileAsync,
  createFileSync,
  deleteFile,
  readFileAsync,
  readFileSync,
  streamLoggerFile,
  updateFileAsync,
  updateFileSync,
} from '../controllers/filesController.js';

const router = express.Router();

// stream logger file to server
router.get('/logger', streamLoggerFile);

//read file using sync method
router.get('/read/sync/:fileName', fileNameCheck, fileNotFound, readFileSync);
//read file using async method
router.get('/read/async/:fileName', fileNameCheck, fileNotFound, readFileAsync);

//create new file using sync
router.post(
  '/create/sync/:fileName',
  fileNameCheck,
  dataValidation,
  existFile,
  createFileSync
);

//create new file using async
router.post(
  '/create/async/:fileName',
  fileNameCheck,
  dataValidation,
  existFile,
  createFileAsync
);

//update file using sync method
router.post(
  '/update/sync/:fileName',
  fileNameCheck,
  fileNotFound,
  dataValidation,
  updateFileSync
);
//update file using async method
router.post(
  '/update/async/:fileName',
  fileNameCheck,
  fileNotFound,
  dataValidation,
  updateFileAsync
);

//delete file
router.delete('/delete/:fileName', fileNameCheck, fileNotFound, deleteFile);

export default router;
