const handleMongooseError = (error, data, next) => {
  const { name, code } = error;
  // Handle error response for duplicate email:
  const status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
  error.status = status;
  next();
};

module.exports = handleMongooseError;
