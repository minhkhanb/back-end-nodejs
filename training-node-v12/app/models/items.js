const Item = require(`${__schema}/items`);

module.exports = {
  list: (condition, conditionSort, currentPage, totalItemsPage) => {
    return Item
      .find(condition)
      .sort(conditionSort)
      .limit(totalItemsPage)
      .skip((currentPage - 1) * totalItemsPage);
  },
  count: (condition) => {
    return Item.count(condition);
  },
  changeStatus: (cid, status, options) => {
    const isManyUpdate = Array.isArray(cid);

    const fields = {
      status,
      ...options
    };

    if (isManyUpdate) {
      return Item.updateMany({_id: {$in: cid}}, fields);
    }

    return Item.updateOne({_id: cid}, fields);
  },
  changeOrdering: (cid, ordering, options) => {
    const isManyUpdate = Array.isArray(cid);

    if (isManyUpdate) {
      return Promise.all(
        cid.map((id, index) => {
          const fields = {
            ordering: parseInt(ordering[index]),
            ...options
          };

          return Item.updateOne({_id: id}, fields);
        })
      );
    }

    const fields = {
      ordering: parseInt(ordering),
      ...options
    }

    return Item.updateOne({_id: cid}, fields);
  },
  delete: (cid) => {
    const isManyDelete = Array.isArray(cid);

    if (isManyDelete) {
      return Item.deleteMany({_id: {$in: cid}});
    }

    return Item.deleteOne({_id: cid});
  },
  getUser: (id) => {
    return Item.findById(id);
  },
  save: (itemId = '', fields, options) => {
    const isUpdate = itemId !== '';

    const data = {
      ...fields,
      ...options
    }

    if (isUpdate) {
      return Item.updateOne({_id: itemId}, data);
    }

    return Item.create(data);
  }
};