const { validationResult } = require('express-validator');

const useValidation = (req) => {
  const errors = validationResult(req);

  return {
    isError: errors.isEmpty(),
    errors: errors.array(),
  };
};

module.exports = {
  useValidation,
};
