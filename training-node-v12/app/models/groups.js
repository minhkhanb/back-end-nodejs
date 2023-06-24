const Group = require('@src/schema/groups');

module.exports = {
  list: (condition, conditionSort, currentPage, totalItemsPage) => {
    return Group.find(condition)
      .sort(conditionSort)
      .limit(totalItemsPage)
      .skip((currentPage - 1) * totalItemsPage);
  },
  count: (condition) => {
    return Group.count(condition);
  },
  changeStatus: (cid, status, options) => {
    const isManyUpdate = Array.isArray(cid);

    const fields = {
      status,
      ...options,
    };

    if (isManyUpdate) {
      return Group.updateMany({ _id: { $in: cid } }, fields);
    }

    return Group.updateOne({ _id: cid }, fields);
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

          return Group.updateOne({ _id: id }, fields);
        })
      );
    }

    const fields = {
      ordering: parseInt(ordering),
      ...options,
    };

    return Group.updateOne({ _id: cid }, fields);
  },
  delete: (cid) => {
    const isManyDelete = Array.isArray(cid);

    if (isManyDelete) {
      return Group.deleteMany({ _id: { $in: cid } });
    }

    return Group.deleteOne({ _id: cid });
  },
  getUser: (id) => {
    return Group.findById(id);
  },
  save: (itemId = '', fields, options) => {
    const isUpdate = itemId !== '';

    const data = {
      ...fields,
      ...options,
    };

    if (isUpdate) {
      return Group.updateOne({ _id: itemId }, data);
    }

    return Group.create(data);
  },
  changeGroup: (groupId, data) => {
    return Group.updateOne({ _id: groupId }, data);
  },
  getGroups: () => {
    return Group.find({}, { id: 1, name: 1 });
  },
};
