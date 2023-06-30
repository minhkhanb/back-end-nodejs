const Users = require('@src/schema/users');

const validationSchema = {
  username: {
    isLength: {
      options: { min: 3, max: 100 },
      errorMessage: 'Username must be between 3 and 100 characters.',
    },
    custom: {
      options: async (value) => {
        const user = await Users.findOne({ username: value });

        if (user) {
          return Promise.reject('User already exists');
        }
      },
    },
  },
  avatar: {
    custom: {
      options: (value) => {
        if (!value) {
          return Promise.reject('Please upload an avatar.');
        }

        return true;
      },
    },
  },
  ordering: {
    isInt: {
      options: { min: 0, max: 100 },
      errorMessage: 'Ordering from 0 to 100',
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
  group: {
    custom: {
      options: (value) => {
        if (value === 'novalue') {
          return Promise.reject('Choose a group.');
        }

        return true;
      },
    },
  },
};

module.exports = {
  validationSchema,
};
