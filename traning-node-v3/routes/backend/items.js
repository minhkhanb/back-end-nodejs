var express = require('express');
var router = express.Router();
const itemsShema = require('./../../schema/items');
const { getFilterStatus, getParams } = require('../../helper/utils');

router.get('(/status/:status)?', async function (req, res, next) {
  const currentStatus = getParams(req.params, 'status', 'all');
  const keyword = getParams(req.query, 'search', '');
  const filter = {};

  if (currentStatus !== 'all') {
    filter.status = currentStatus;
  }

  if (keyword !== '') {
    filter.name = new RegExp(keyword, 'i');
  }

  const pagination = {
    totalItems: 0,
    totalItemPages: 1,
    pageRanges: 5,
    currentPage: 0,
    totalPages: 0
  };

  pagination.currentPage = Math.max(+getParams(req.query, 'page', 1), 1);

  pagination.totalItems = await itemsShema.count(filter);

  pagination.totalPages = Math.ceil(pagination.totalItems / pagination.totalItemPages);

  const from = (pagination.currentPage - 1) * pagination.totalItemPages;
  const to = Math.min(pagination.currentPage * pagination.totalItemPages, pagination.totalItems);

  console.log(from, to);

  itemsShema.find(filter)
    .sort({ name: 'descending' })
    .limit(to)
    .skip(from)
    .then((items) => {
      console.log(items);
      getFilterStatus(currentStatus).then(filterByStatus => {
        res.render('pages/items/list', {
          pageTitle: 'Item Management',
          items: items,
          filterByStatus,
          currentStatus,
          keyword,
          pagination
        });
      });
    });
});

router.get('/add', function (req, res, next) {
  res.render('pages/items/add', { pageTitle: 'Add Itemm Management' });
});

module.exports = router;
