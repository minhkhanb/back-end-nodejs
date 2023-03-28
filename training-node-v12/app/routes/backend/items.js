const express = require('express');
const moment = require('moment');
const util = require('node:util');
const {checkSchema, validationResult} = require('express-validator');

const systemConfig = require(`${__config}/system`);
const {config} = require(`${__config}/database`);
const Item = require(`${__schema}/items`);
const Group = require(`${__schema}/groups`);
const ItemQuery = require(`${__models}/items`);

const {createStatusFilter} = require(`${__helper}/utils`);
const {getParam} = require(`${__helper}/param`);

const {validationSchema} = require(`${__validation}/items`);

const {UPDATE_SUCCESS_MESSAGE} = require(`${__helper}/notify`);
const {items: collection} = config.collection;

const itemsRouter = express.Router();

const pageTitle = 'Items Manager ';
const pageTitleAdd = pageTitle + 'Add';
const pageTitleEdit = pageTitle + 'Edit';

const linkIndex = `/${systemConfig.prefixAdmin}/${collection}`;

const {view} = require(`${__config}/view`);

itemsRouter.get('(/status/:status)?', async (req, res, next) => {
  const currentStatus = getParam(req.params, 'status', 'all');
  const currentPage = parseInt(getParam(req.query, 'page', 1));
  const keyword = getParam(req.query, 'keyword', '');

  let sortField = getParam(req.session, 'sort_field', 'ordering');
  let sortType = getParam(req.session, 'sort_type', 'asc');
  let groupId = getParam(req.session, 'group_id', '');

  const statusFilter = await createStatusFilter(collection, currentStatus);
  let condition = {};

  const sort = {
    field: sortField,
    type: sortType
  };

  const groups = await Group.find({}, {id: 1, name: 1});

  const conditionSort = {
    [sort.field]: sort.type
  };

  const sortFilter = {
    statusFilter,
    currentStatus,
    keyword,
    sort
  };

  let pagination = {
    totalItems: 1,
    totalItemsPage: 4,
    currentPage,
    pageRanges: 3,
  };

  if (currentStatus !== 'all') {
    condition.status = currentStatus;
  }

  if (keyword !== '') {
    condition.name = new RegExp(keyword, 'i');
  }

  if (groupId !== '' && groupId !== 'novalue') {
    condition = {
      ...condition,
      'group.id': groupId
    };
  }

  pagination.totalItems = await ItemQuery.count(condition);

  const {totalItemsPage} = pagination;

  const items = await ItemQuery.list(condition, conditionSort, currentPage, totalItemsPage);

  res.render(`${view.items}/list`, {
    pageTitle: pageTitle,
    items,
    sortFilter,
    pagination,
    moment,
    collection,
    groups,
    groupId
  });
});

itemsRouter.get('/change-status/:id/:status', async (req, res, next) => {
  const currentStatus = getParam(req.params, 'status', 'active');
  const id = getParam(req.params, 'id', '');
  const status = currentStatus === 'active' ? 'inactive' : 'active';

  await ItemQuery.changeStatus(id, status, {
    modify: {
      user_name: 'admin',
      user_id: 0,
    }
  });

  req.flash('success', UPDATE_SUCCESS_MESSAGE, linkIndex);
});

itemsRouter.get('/delete/:id', async (req, res, next) => {
  const id = getParam(req.params, 'id', '');

  await ItemQuery.delete(id);

  req.flash('success', 'Xóa phần tử thành công', linkIndex);
});

itemsRouter.post('/change-status/:status', async (req, res, next) => {
  const currentStatus = getParam(req.params, 'status', 'active');

  const results = await ItemQuery.changeStatus(req.body.cid, currentStatus, {
    modify: {
      user_name: 'admin',
      user_id: 0,
    }
  });

  req.flash('success', util.format(UPDATE_SUCCESS_MESSAGE, results.matchedCount), linkIndex);
});

itemsRouter.post('/delete', async (req, res, next) => {
  const results = await ItemQuery.delete(req.body.cid);

  req.flash('success', `Xóa ${results.deletedCount} phần tử thành công`, linkIndex);
});

itemsRouter.post('/change-ordering', async (req, res, next) => {
  let cid = req.body.cid;
  let ordering = req.body.ordering;

  if (Array.isArray(cid)) {
    const updatedResults = await ItemQuery.changeOrdering(cid, ordering, {
      modify: {
        user_name: 'admin',
        user_id: 0,
      },
    });

    const count = updatedResults.flatMap(
      (result) => result.matchedCount
    ).length;

    req.flash(
      'success',
      util.format(UPDATE_SUCCESS_MESSAGE, `${count} ordering`),
      linkIndex
    );
  } else {
    await ItemQuery.changeOrdering(cid, ordering, {
      modify: {
        user_name: 'admin',
        user_id: 0,
      },
    });

    req.flash(
      'success',
      util.format(UPDATE_SUCCESS_MESSAGE, 'ordering'),
      linkIndex
    );
  }
});

itemsRouter.get('/form(/:id)?', async (req, res, next) => {
  const id = getParam(req.params, 'id', '');
  let showError = null;
  let user = Object.assign(req.body);

  const groups = await Group.find({}, {id: 1, name: 1});

  if (id === '') {
    const item = {
      name: '',
      ordering: '',
      status: ''
    };

    res.render(`${view.items}/form`, {
      pageTitle: pageTitleAdd,
      item,
      showError,
      collection,
      groups
    });
  } else {
    const item = await ItemQuery.getUser(id);

    res.render(`${view.items}/form`, {
      pageTitle: pageTitleEdit,
      item: {
        _id: item._id,
        name: item.name,
        ordering: item.ordering,
        status: item.status,
      },
      showError,
      collection,
      groups
    });
  }
});

itemsRouter.post(
  '/save',
  checkSchema(validationSchema),
  async (req, res, next) => {
    const errors = validationResult(req);
    req.body = JSON.parse(JSON.stringify(req.body));
    let item = Object.assign(req.body);

    if ((item !== 'undefined' && item.id !== '')) {

      if (!errors.isEmpty()) {
        res.render(`${view.items}/form`, {
          pageTitle: pageTitleEdit,
          item: {
            ...item,
          },
          showError: errors.errors,
          collection,
        });
      } else {
        const fields = {
          name: item.name,
          ordering: parseInt(item.ordering),
          status: item.status,
          description: item.description,
        };

        await ItemQuery.save(item.id, fields, {
          modify: {
            user_name: 'admin',
            user_id: 0,
          }
        })

        req.flash('success', 'Thay đổi phần tử thành công', linkIndex);
      }
    } else {
      if (!errors.isEmpty()) {
        res.render(`${view.items}/form`, {
          pageTitle: pageTitleAdd,
          item: {
            ...item,
          },
          showError: errors.errors,
          collection
        });
      } else {
        const {id, name, ordering, status, description} = item;

        await ItemQuery.save('', {
          name,
          ordering: parseInt(ordering),
          status,
          description
        }, {
          created: {
            user_name: 'admin',
            user_id: 0,
          }, modify: {
            user_name: 'admin',
            user_id: 0,
          }
        })

        req.flash('success', 'Thêm mới phần tử thành công', linkIndex);
      }
    }
  }
);

itemsRouter.get('/sort/:sortField/:sortType', async (req, res, next) => {
  req.session.sort_field = getParam(req.params, 'sortField', 'ordering');
  req.session.sort_type = getParam(req.params, 'sortType', 'asc');

  res.redirect(linkIndex);
});

itemsRouter.get('/filter-group/:groupId', async (req, res, next) => {
  req.session.group_id = getParam(req.params, 'groupId', '');

  res.redirect(linkIndex);
});

module.exports = itemsRouter;
