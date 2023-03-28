const express = require('express');
const moment = require('moment');
const util = require('node:util');
const path = require('path');
const {checkSchema, validationResult} = require('express-validator');

const systemConfig = require(`${__config}/system`);
const {config} = require(`${__config}/database`);
const User = require(`${__schema}/users`);
const Group = require(`${__schema}/groups`);
const UserQuery = require(`${__models}/users`);
const GroupQuery = require(`${__models}/groups`);

const {createStatusFilter} = require(`${__helper}/utils`);
const {getParam} = require(`${__helper}/param`);
const {uploadFile} = require(`${__helper}/upload`);

const {validationSchema} = require(`${__validation}/users`);

const {UPDATE_SUCCESS_MESSAGE} = require(`${__helper}/notify`);
const {users: collection} = config.collection;

const usersRouter = express.Router();

const pageTitle = 'Users Manager ';
const pageTitleAdd = pageTitle + 'Add';
const pageTitleEdit = pageTitle + 'Edit';

const linkIndex = `/${systemConfig.prefixAdmin}/${collection}`;

const {view} = require(`${__config}/view`);

const upload = uploadFile();

usersRouter.get('(/status/:status)?', async (req, res, next) => {
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

  const groups = await GroupQuery.getGroups();

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
    console.log(groupId);
    condition = {
      ...condition,
      'group.id': groupId
    };
  }

  pagination.totalItems = await UserQuery.count(condition);

  const {totalItemsPage} = pagination;

  const items = await UserQuery.list(condition, conditionSort, currentPage, totalItemsPage);

  res.render(`${view.users}/list`, {
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

usersRouter.get('/change-status/:id/:status', async (req, res, next) => {
  const currentStatus = getParam(req.params, 'status', 'active');
  const id = getParam(req.params, 'id', '');
  const status = currentStatus === 'active' ? 'inactive' : 'active';

  await UserQuery.changeStatus(id, status, {
    modify: {
      user_name: 'admin',
      user_id: 0,
    }
  });

  req.flash('success', UPDATE_SUCCESS_MESSAGE, linkIndex);
});

usersRouter.get('/delete/:id', async (req, res, next) => {
  const id = getParam(req.params, 'id', '');

  await UserQuery.delete(id);

  req.flash('success', 'Xóa phần tử thành công', linkIndex);
});

usersRouter.post('/change-status/:status', async (req, res, next) => {
  const currentStatus = getParam(req.params, 'status', 'active');

  const results = await UserQuery.changeStatus(req.body.cid, currentStatus, {
    modify: {
      user_name: 'admin',
      user_id: 0,
    }
  });

  req.flash('success', util.format(UPDATE_SUCCESS_MESSAGE, results.matchedCount), linkIndex);
});

usersRouter.post('/delete', async (req, res, next) => {
  const results = await UserQuery.delete(req.body.cid);

  req.flash('success', `Xóa ${results.deletedCount} phần tử thành công`, linkIndex);
});

usersRouter.post('/change-ordering', async (req, res, next) => {
  let cid = req.body.cid;
  let ordering = req.body.ordering;

  if (Array.isArray(cid)) {
    const updatedResults = await UserQuery.changeOrdering(cid, ordering, {
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
    await UserQuery.changeOrdering(cid, ordering, {
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

usersRouter.get('/form(/:id)?', async (req, res, next) => {
  const id = getParam(req.params, 'id', '');
  let showError = null;
  let user = Object.assign(req.body);

  const groups = await GroupQuery.getGroups();

  if (id === '') {
    const item = {
      username: '',
      fullname: '',
      email: '',
      group: {
        _id: user.group_id || '',
        name: user.group_name || ''
      },
      ordering: '',
      status: ''
    };

    res.render(`${view.users}/form`, {
      pageTitle: pageTitleAdd,
      item,
      showError,
      collection,
      groups
    });
  } else {
    const item = await UserQuery.getUser(id);

    res.render(`${view.users}/form`, {
      pageTitle: pageTitleEdit,
      item: {
        _id: item._id,
        username: item.username,
        fullname: item.fullname,
        email: item.email,
        group: {
          _id: item.group.id,
          name: item.group.name
        },
        ordering: item.ordering,
        status: item.status,
      },
      showError,
      collection,
      groups
    });
  }
});

usersRouter.post(
  '/save',
  checkSchema(validationSchema),
  async (req, res, next) => {
    const errors = validationResult(req);
    req.body = JSON.parse(JSON.stringify(req.body));
    let item = Object.assign(req.body);

    console.log('item: ', item);

    const groups = await GroupQuery.getGroups();

    if ((item !== 'undefined' && item.id !== '')) {

      if (!errors.isEmpty()) {
        res.render(`${view.users}/form`, {
          pageTitle: pageTitleEdit,
          item: {
            ...item,
            group: {
              _id: item.group_id,
              name: item.group_name
            }
          },
          showError: errors.errors,
          collection,
          groups
        });
      } else {
        const fields = {
          username: item.username,
          fullname: item.fullname,
          email: item.email,
          group: {
            id: item.group_id,
            name: item.group_name
          },
          ordering: parseInt(item.ordering),
          status: item.status,
          description: item.description,
        };

        console.log('update: ', fields);

        await User.updateOne({_id: item.id}, fields);

        req.flash('success', 'Thay đổi phần tử thành công', linkIndex);
      }
    } else {
      if (!errors.isEmpty()) {
        res.render(`${view.users}/form`, {
          pageTitle: pageTitleAdd,
          item: {
            ...item,
            group: {
              _id: item.group_id,
              name: item.group_name
            }
          },
          showError: errors.errors,
          collection,
          groups
        });
      } else {
        item.created = {
          user_name: 'admin',
          user_id: 0,
        };

        item.modify = {
          user_name: 'admin',
          user_id: 0,
        };

        item.group = {
          id: item.group_id,
          name: item.group_name
        };

        await User.create(item);

        req.flash('success', 'Thêm mới phần tử thành công', linkIndex);
      }
    }
  }
);

usersRouter.get('/sort/:sortField/:sortType', async (req, res, next) => {
  req.session.sort_field = getParam(req.params, 'sortField', 'ordering');
  req.session.sort_type = getParam(req.params, 'sortType', 'asc');

  res.redirect(linkIndex);
});

usersRouter.get('/filter-group/:groupId', async (req, res, next) => {
  req.session.group_id = getParam(req.params, 'groupId', '');

  res.redirect(linkIndex);
});

usersRouter.get('/upload', async (req, res, next) => {

  res.render(`${view.users}/upload`, {
    pageTitle: pageTitleEdit,
  });

});

usersRouter.post('/upload', upload.single('upload_file'), async (req, res, next) => {
  console.log(req.file, req.body);
  res.render(`${view.users}/upload`, {
    pageTitle: pageTitleEdit,
  });

});

module.exports = usersRouter;
