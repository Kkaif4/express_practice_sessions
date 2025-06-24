function validationCheck({ name, age, city }) {
  if (!name || typeof name !== 'string' || !isNaN(name) || name.trim() === '') {
    return new Error('Name field must be string and cannot be empty');
  } else if (!age || isNaN(age) || Number(age) < 0) {
    return new Error('age must be a +ve integer and cannot be empty');
  } else if (
    !city ||
    typeof city !== 'string' ||
    !isNaN(city) ||
    city.trim() === ''
  ) {
    return new Error('city must be a string and cannot be empty ');
  }
  return null;
}

export const validationQuery = (req, res, next) => {
  const error = validationCheck(req.query);
  if (error) {
    return next(error);
  }
  next();
};
export const validationParams = (req, res, next) => {
  const error = validationCheck(req.params);
  if (error) {
    return next(error);
  }
  next();
};
export const validationBody = (req, res, next) => {
  const error = validationCheck(req.body);
  if (error) {
    return next(error);
  }
  next();
};
