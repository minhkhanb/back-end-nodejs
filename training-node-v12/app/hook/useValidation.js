const { validationResult } = require('express-validator');

const useValidation = (req) => {
  const errors = validationResult(req);

  console.log('PDebug2: ', errors.array());

  return {
    isError: errors.isEmpty(),
    errors: errors.array(),
  };
};

module.exports = {
  useValidation,
};
