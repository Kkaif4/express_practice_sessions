export const fileCheck = (req, res, next) => {
  console.log(req.file);
  if (!req.file) {
    return next(new Error('Attachments are required'));
  }
  next();
};

export const filesCheck = (req, res, next) => {
  if (!req.files) {
    return next(new Error('Attachments are required'));
  }
  next();
};
