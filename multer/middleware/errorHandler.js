export const errorHandler = (err, req, res, next) => {
  const Error = err.name === 'MulterError';
  const message = err.message || 'Something went wrong.';

  if (Error) {
    return res.status(400).json({ error: `Multer Error: ${message}` });
  }

  res.status(500).json({ message: err.message || 'internal server error' });
};
