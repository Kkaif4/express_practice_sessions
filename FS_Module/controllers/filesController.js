import fs from 'fs';
import { setLog } from '../utils/setLog.js';

export const streamLoggerFile = (req, res, next) => {
  const fileName = './logger.jsonl';
  const readStream = fs.createReadStream(fileName, 'utf-8');

  readStream.on('error', () => {
    const log = `Error in streaming file ${fileName}`;
    return next(new Error(log));
  });
  readStream.on('end', () => {
    const log = 'logger file streaming complete';
    setLog(req, res, log);
  });
  readStream.pipe(res);
};

export const createFileSync = (req, res, next) => {
  const { fileName } = req.params;
  const { data } = req.body;
  try {
    fs.writeFileSync(`./New_Files/${fileName}.txt`, `${data}\n`);
    const log = `${fileName}.txt file created(Sync)`;
    res.json({ message: log, success: true });
    setLog(req, res, log);
  } catch (err) {
    const log = err.message || 'error creating file (SYNC)';
    return next(log);
  }
};

export const createFileAsync = (req, res, next) => {
  const { fileName } = req.params;
  const { data } = req.body;
  try {
    fs.writeFile(`./New_Files/${fileName}.txt`, `${data}\n`, (err) => {
      if (err) {
        const log = `error creating ${fileName}.txt file (Async) ${err.message}`;
        return next(new Error(log));
      }
      const log = `${fileName}.txt file created (Async)`;
      res.json({ message: log, success: true });
      setLog(req, res, log);
    });
  } catch (err) {
    const log = `internal server error creating file (Async)`;
    return next(new Error(log));
  }
};

export const readFileSync = (req, res, next) => {
  const { fileName } = req.params;
  try {
    const fileData = fs.readFileSync(`./New_Files/${fileName}.txt`, 'utf-8');
    if (!fileData) {
      return next(new Error(`cannot read empty file ${fileName}.txt`));
    }
    const log = `reading file ${fileName}.txt (Sync) `;
    res.json({ date: fileData, message: log, success: true });
    setLog(req, res, log);
  } catch (err) {
    const log = `internal server error in reading ${fileName}.txt file (Sync)`;
    return next(new Error(log));
  }
};

export const readFileAsync = (req, res, next) => {
  const fileName = req.params.fileName;
  try {
    fs.readFile(`./New_Files/${fileName}.txt`, 'utf-8', (err, fileData) => {
      if (!fileData) {
        return next(new Error(`cannot read empty file ${fileName}.txt`));
      }
      if (err) {
        const log = `error in reading ${fileName}.txt file (ASYNC)`;
        return next(new Error(log));
      }
      const log = `reading file ${fileName}.txt (ASYNC) `;
      res.json({ data: fileData, message: log, success: true });
      setLog(req, res, log);
    });
  } catch (err) {
    const log = `internal server error in reading ${fileName}.txt file (ASYNC)`;
    return next(new Error(log));
  }
};

export const updateFileSync = (req, res, next) => {
  const { fileName } = req.params;
  const { data } = req.body;
  try {
    fs.appendFileSync(`./New_Files/${fileName}.txt`, `${data}\n`);
    const log = `${fileName}.txt file updated successfully (Sync)`;
    res.json({ message: log, success: true });
    setLog(req, res, log);
  } catch (err) {
    const log = `error in updating file ${fileName}.txt file(Sync)`;
    return next(new Error(log));
  }
};

export const updateFileAsync = (req, res, next) => {
  const { fileName } = req.params;
  const { data } = req.body;
  try {
    fs.appendFile(`./New_Files/${fileName}.txt`, `${data}\n`, (err) => {
      if (err) {
        const log = `error updating file ${fileName}.txt (ASYNC)`;
        return next(new Error(log));
      }
    });
    const log = `file ${fileName}.txt updated (ASYNC)`;
    res.json({ message: log, success: true });
    setLog(req, res, log);
  } catch (err) {
    const log = `internal server error in writing file (ASYNC)`;
    return next(new Error(log));
  }
};

export const deleteFile = (req, res, next) => {
  const { fileName } = req.params;
  try {
    fs.unlinkSync(`./New_Files/${fileName}.txt`);
    const log = `file ${fileName}.txt Deleted`;
    res.json({ message: log, success: true });
    setLog(req, res, log);
  } catch (err) {
    const log = 'Error deleting File';
    return next(new Error(log));
  }
};
