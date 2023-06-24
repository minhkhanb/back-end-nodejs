const Groups = require('@src/schema/groups');

const validationSchema = {
  name: {
    notEmpty: {
      errorMessage: 'Name is not empty.',
    },
    custom: {
      options: async (value) => {
        const user = await Groups.findOne({ name: value });

        if (user) {
          return Promise.reject('Group already exists');
        }
      },
    },
  },
  ordering: {
    isInt: {
      options: { min: 0, max: 100 },
      errorMessage: 'Ordering must be between 0 and 100',
    },
  },
  status: {
    custom: {
      options: (value) => {
        if (value === 'novalue') {
          return Promise.reject('Choose a status.');
        }

        return true;
      },
    },
  },
};

module.exports = {
  validationSchema,
};
