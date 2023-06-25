const handleErrorMessage = (message) => {
  if (message === '"favorite" is required') {
    return "missing field favourite";
  }

  return message;
};

module.exports = handleErrorMessage;
