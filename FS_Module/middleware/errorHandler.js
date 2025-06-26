/*
 * this error handler takes 4 arguments (err, req, res, next)
 *
 */

import { setLog } from '../utils/setLog.js';

export const errorHandler = (err, req, res, next) => {
  const log = err.message || 'internal server error in the error handler';
  res.status(500).json({ error: log, success: false });
  setLog(req, res, log);
};
