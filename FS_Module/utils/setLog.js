import fs from 'fs';

/*
 * in this set log util function we are taking 3 arguments. (req, res, log)
 * create read stream with append data permission {flags : 'a'}
 * then we set a log when response is finished.
 */

export const setLog = (req, res, log) => {
  const writeStream = fs.createWriteStream('./logger.jsonl', { flags: 'a' });
  const { start, date, time } = req.timestamp || {};
  res.on('finish', () => {
    const end = Date.now();
    const duration = end - start;
    const jsonLog = {
      log,
      date,
      time,
      responseTime: `${duration} ms`,
    };
    const success = writeStream.write(JSON.stringify(jsonLog) + '\n');
    if (!success) {
      console.warn('Backpressure: Stream buffer full');
    }
  });
};
