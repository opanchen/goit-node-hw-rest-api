const { HttpError, handleErrorMessage } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) next(HttpError(400, handleErrorMessage(error.message)));

    next();
  };

  return func;
};

module.exports = validateBody;
