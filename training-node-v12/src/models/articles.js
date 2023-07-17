const Article = require('@src/schema/articles');

module.exports = {
  list: (condition, conditionSort, currentPage, totalItemsPage) => {
    return Article.find(condition)
      .sort(conditionSort)
      .limit(totalItemsPage)
      .skip((currentPage - 1) * totalItemsPage);
  },
  listPosition: () => {
    return Article.find({ status: 'active', position: 'active' })
      .sort({ ordering: 'asc' })
      .limit(3);
  },
  count: (condition) => {
    return Article.count(condition);
  },
  changeStatus: (cid, status, options) => {
    const isManyUpdate = Array.isArray(cid);

    const fields = {
      status,
      ...options,
    };

    if (isManyUpdate) {
      return Article.updateMany({ _id: { $in: cid } }, fields);
    }

    return Article.updateOne({ _id: cid }, fields);
  },
  changePosition: (cid, position, options) => {
    const isManyUpdate = Array.isArray(cid);

    const fields = {
      position,
      ...options,
    };

    if (isManyUpdate) {
      return Article.updateMany({ _id: { $in: cid } }, fields);
    }

    return Article.updateOne({ _id: cid }, fields);
  },
  changeOrdering: (cid, ordering, options) => {
    const isManyUpdate = Array.isArray(cid);

    if (isManyUpdate) {
      return Promise.all(
        cid.map((id, index) => {
          const fields = {
            ordering: parseInt(ordering[index]),
            ...options,
          };

          return Article.updateOne({ _id: id }, fields);
        })
      );
    }

    const fields = {
      ordering: parseInt(ordering),
      ...options,
    };

    return Article.updateOne({ _id: cid }, fields);
  },
  delete: (cid) => {
    const isManyDelete = Array.isArray(cid);

    if (isManyDelete) {
      return Article.deleteMany({ _id: { $in: cid } });
    }

    return Article.deleteOne({ _id: cid });
  },
  getUser: (id) => {
    return Article.findById(id);
  },
  save: (itemId = '', fields, options) => {
    const isUpdate = itemId !== '';

    const data = {
      ...fields,
      ...options,
    };

    if (isUpdate) {
      return Article.updateOne({ _id: itemId }, data);
    }

    return Article.create(data);
  },
  changeGroup: (groupId, data) => {
    return Article.updateOne({ _id: groupId }, data);
  },
  getGroups: () => {
    return Article.find({}, { id: 1, name: 1 });
  },
};
