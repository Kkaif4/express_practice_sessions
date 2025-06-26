export const errorHandler = (err, req, res, next) => {
  res
    .status(500)
    .json({ message: err.message || 'internal server error', success: false });
};
