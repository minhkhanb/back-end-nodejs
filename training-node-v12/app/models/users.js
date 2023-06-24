const User = require('@src/schema/users');

module.exports = {
  list: (conditions, sortBy, page, perPage) => {
    return User.find(conditions)
      .sort(sortBy)
      .skip((page - 1) * perPage)
      .limit(perPage);
  },
  count: (condition) => {
    return User.count(condition);
  },
  changeStatus: (cid, status, options) => {
    const fields = {
      status,
      ...options,
    };

    if (Array.isArray(cid)) {
      const conditions = { _id: { $in: cid } };

      return User.updateMany(conditions, fields);
    }

    const conditions = { _id: cid };

    return User.updateOne(conditions, fields);
  },
  changeOrdering: (cid, ordering, options) => {
    if (Array.isArray(cid)) {
      return Promise.all(
        cid.map((id, index) => {
          const conditions = { _id: id };

          const fields = {
            ordering: parseInt(ordering[index]),
            ...options,
          };

          return User.updateOne(conditions, fields);
        })
      );
    }

    const conditions = { _id: cid };

    const fields = {
      ordering: parseInt(ordering),
      ...options,
    };

    return User.updateOne(conditions, fields);
  },
  delete: (cid) => {
    if (Array.isArray(cid)) {
      const conditions = { _id: { $in: cid } };

      return User.deleteMany(conditions);
    }

    const conditions = { _id: cid };

    return User.deleteOne(conditions);
  },
  getById: (id) => {
    return User.findById(id);
  },
  save: (itemId = '', fields, options) => {
    const isUpdate = itemId !== '';

    const data = {
      ...fields,
      ...options,
    };

    if (isUpdate) {
      const conditions = { _id: itemId };

      return User.updateOne(conditions, data);
    }

    return User.create(data);
  },
};
