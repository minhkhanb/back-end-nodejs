const Items = require('@src/schema/items');

const validationSchema = {
  name: {
    isLength: {
      options: { min: 5, max: 100 },
      errorMessage: 'Field must be between 5 and 100 characters.',
    },
    custom: {
      options: async (value) => {
        const user = await Items.findOne({ name: value });

        if (user) {
          return Promise.reject('Item already exists');
        }
      },
    },
  },
  ordering: {
    isInt: {
      options: { min: 0, max: 100 },
      errorMessage: 'Field from 0 to 100',
    },
  },
  status: {
    custom: {
      options: (value) => {
        if (value === 'novalue') {
          return Promise.reject('Choose a status other than novalue.');
        }

        return true;
      },
    },
  },
};

module.exports = {
  validationSchema,
};
