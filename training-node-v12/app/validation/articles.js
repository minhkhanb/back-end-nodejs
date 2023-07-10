const Article = require('@src/schema/articles');

const validationSchema = {
  name: {
    isLength: {
      options: { min: 5, max: 100 },
      errorMessage: 'Field must be between 5 and 100 characters.',
    },
    custom: {
      options: async (value) => {
        const user = await Article.findOne({ name: value });

        if (user) {
          return Promise.reject('Item already exists');
        }
      },
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
