export const validateFileName = (req, res, next) => {
  const { fileName } = req.params.fileName;
  if (
    !fileName ||
    fileName === 'undefined' ||
    fileName === 'null' ||
    typeof fileName !== 'string' ||
    fileName.trim() === ''
  ) {
    const err = new Error('File Name must be string and should now be empty');
    return next(err);
  }
  next();
};
