const Menu = require('@src/schema/menus');

const validationSchema = {
  name: {
    isLength: {
      options: { min: 3, max: 100 },
      errorMessage: 'Field must be between 3 and 100 characters.',
    },
    custom: {
      options: async (value) => {
        const user = await Menu.findOne({ name: value });

        if (user) {
          return Promise.reject('Item already exists');
        }
      },
    },
  },
  slug: {
    isSlug: {
      errorMessage: 'Slug is require',
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
