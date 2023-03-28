const express = require('express');
const moment = require('moment');
const util = require('node:util');
const { checkSchema, validationResult } = require('express-validator');

const systemConfig = require('@src/config/system');
const { config } = require('@src/config/database');
const GroupQuery = require('@src/models/groups');

const { createStatusFilter } = require('@src/helper/utils');
const { getParam } = require('@src/helper/param');

const { validationSchema } = require('@src/validation/groups');

const { UPDATE_SUCCESS_MESSAGE } = require('@src/helper/notify');
const { groups: collection } = config.collection;

const groupsRouter = express.Router();

const pageTitle = 'Groups Manager ';
const pageTitleAdd = pageTitle + 'Add';
const pageTitleEdit = pageTitle + 'Edit';

const linkIndex = `/${systemConfig.prefixAdmin}/${collection}`;

const { view } = require('@src/config/view');
const { useGroupRequest, useChangeStatus } = require('@src/hook/group');

groupsRouter.get('(/status/:status)?', async (req, res) => {
  const { currentStatus, currentPage, keyword, sortType, sortField } = useGroupRequest(req);

  const statusFilter = await createStatusFilter(collection, currentStatus);
  let condition = {};

  const sort = {
    field: sortField,
    type: sortType,
  };

  const conditionSort = {
    [sort.field]: sort.type,
  };

  const sortFilter = {
    statusFilter,
    currentStatus,
    keyword,
    sort,
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

  pagination.totalItems = await GroupQuery.count(condition);

  const { totalItemsPage } = pagination;

  const items = await GroupQuery.list(condition, conditionSort, currentPage, totalItemsPage);

  res.render(`${view.groups}/list`, {
    pageTitle: pageTitle,
    items,
    sortFilter,
    pagination,
    moment,
    collection,
  });
});

groupsRouter.get('/change-status/:id/:status', async (req) => {
  const { id, status } = useChangeStatus(req);

  await GroupQuery.changeStatus(id, status, {
    modify: {
      user_name: 'admin',
      user_id: 0,
    },
  });

  req.flash('success', UPDATE_SUCCESS_MESSAGE, linkIndex);
});

groupsRouter.get('/delete/:id', async (req) => {
  const id = getParam(req.params, 'id', '');

  await GroupQuery.delete(id);

  req.flash('success', 'Xóa phần tử thành công', linkIndex);
});

groupsRouter.post('/change-status/:status', async (req) => {
  const currentStatus = getParam(req.params, 'status', 'active');

  const results = await GroupQuery.changeStatus(req.body.cid, currentStatus, {
    modify: {
      user_name: 'admin',
      user_id: 0,
    },
  });

  req.flash('success', util.format(UPDATE_SUCCESS_MESSAGE, results.matchedCount), linkIndex);
});

groupsRouter.post('/delete', async (req) => {
  const results = await GroupQuery.delete(req.body.cid);

  req.flash('success', `Xóa ${results.deletedCount} phần tử thành công`, linkIndex);
});

groupsRouter.post('/change-ordering', async (req) => {
  let cid = req.body.cid;
  let ordering = req.body.ordering;

  if (Array.isArray(cid)) {
    const updatedResults = await GroupQuery.changeOrdering(cid, ordering, {
      modify: {
        user_name: 'admin',
        user_id: 0,
      },
    });

    const count = updatedResults.flatMap((result) => result.matchedCount).length;

    req.flash('success', util.format(UPDATE_SUCCESS_MESSAGE, `${count} ordering`), linkIndex);
  } else {
    await GroupQuery.changeOrdering(cid, ordering, {
      modify: {
        user_name: 'admin',
        user_id: 0,
      },
    });

    req.flash('success', util.format(UPDATE_SUCCESS_MESSAGE, 'ordering'), linkIndex);
  }
});

groupsRouter.get('/form(/:id)?', async (req, res) => {
  const id = getParam(req.params, 'id', '');
  let showError = null;

  if (id === '') {
    const item = {
      name: '',
      ordering: '',
      status: '',
    };

    res.render(`${view.groups}/form`, {
      pageTitle: pageTitleAdd,
      item,
      showError,
      collection,
    });
  } else {
    const item = await GroupQuery.getUser(id);

    res.render(`${view.groups}/form`, {
      pageTitle: pageTitleEdit,
      item: {
        _id: item._id,
        name: item.name,
        ordering: item.ordering,
        status: item.status,
      },
      showError,
      collection,
    });
  }
});

groupsRouter.post('/save', checkSchema(validationSchema), async (req, res) => {
  const errors = validationResult(req);
  req.body = JSON.parse(JSON.stringify(req.body));
  let item = Object.assign(req.body);

  if (item !== 'undefined' && item.id !== '') {
    if (!errors.isEmpty()) {
      res.render(`${view.groups}/form`, {
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

      await GroupQuery.save(item.id, fields, {
        modify: {
          user_name: 'admin',
          user_id: 0,
        },
      });

      req.flash('success', 'Thay đổi phần tử thành công', linkIndex);
    }
  } else {
    if (!errors.isEmpty()) {
      res.render(`${view.groups}/form`, {
        pageTitle: pageTitleAdd,
        item: {
          ...item,
        },
        showError: errors.errors,
        collection,
      });
    } else {
      const { name, ordering, status, description, group_acp } = item;

      await GroupQuery.save(
        '',
        {
          name,
          ordering: parseInt(ordering),
          status,
          description,
          group_acp,
        },
        {
          created: {
            user_name: 'admin',
            user_id: 0,
          },
          modify: {
            user_name: 'admin',
            user_id: 0,
          },
        }
      );

      req.flash('success', 'Thêm mới phần tử thành công', linkIndex);
    }
  }
});

groupsRouter.get('/sort/:sortField/:sortType', async (req, res) => {
  req.session.sort_field = getParam(req.params, 'sortField', 'ordering');
  req.session.sort_type = getParam(req.params, 'sortType', 'asc');

  res.redirect(linkIndex);
});

groupsRouter.get('/change-groups/:id/:group_acp', async function (req) {
  let currentGroups = getParam(req.params, 'group_acp', 'yes');
  let id = getParam(req.params, 'id', '');
  let groups = currentGroups === 'yes' ? 'no' : 'yes';
  let data = {
    group_acp: groups,
    modify: {
      user_name: 'admin',
      user_id: 0,
    },
  };
  await GroupQuery.changeGroup(id, data);
  req.flash('success', util.format(UPDATE_SUCCESS_MESSAGE, ''), linkIndex);
});

module.exports = groupsRouter;
