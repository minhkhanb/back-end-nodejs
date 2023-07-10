const express = require('express');
const util = require('node:util');
const { checkSchema } = require('express-validator');

const systemConfig = require('@src/config/system');
const { config } = require('@src/config/database');
const GroupQuery = require('@src/models/groups');

const { createStatusFilter } = require('@src/helper/utils');
const { getParam } = require('@src/helper/param');

const { validationSchema } = require('@src/validation/groups');

const {
  UPDATE_SUCCESS_MESSAGE,
  CREATE_SUCCESS_MESSAGE,
  DELETE_SUCCESS_MESSAGE,
} = require('@src/helper/notify');
const { view } = require('@src/config/view');
const { useGroupRequest, useChangeStatus } = require('@src/hook/group');
const { useValidation } = require('@src/hook/useValidation');
const { Mode } = require('@src/config/system');

const { groups: collection } = config.collection;
const groupsRouter = express.Router();

const pageTitle = 'Groups Manager ';
const pageTitleAdd = pageTitle + 'Add';
const pageTitleEdit = pageTitle + 'Edit';

const linkIndex = `/${systemConfig.prefixAdmin}/${collection}`;

groupsRouter.get('(/status/:status)?', async (req, res) => {
  const { currentStatus, currentPage, keyword, sortType, sortField } = useGroupRequest(req);
  const ui = `${view.groups}/list`;
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

  const options = {
    pageTitle,
    items,
    sortFilter,
    pagination,
    collection,
  };

  res.render(ui, {
    ...options,
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

  req.flash('success', util.format(UPDATE_SUCCESS_MESSAGE, ''), linkIndex);
});

groupsRouter.get('/delete/:id', async (req) => {
  const id = getParam(req.params, 'id', '');

  await GroupQuery.delete(id);

  req.flash('success', util.format(DELETE_SUCCESS_MESSAGE, ''), linkIndex);
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

  req.flash(
    'success',
    util.format(DELETE_SUCCESS_MESSAGE, `${results.deletedCount} groups`),
    linkIndex
  );
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
  const mode = id === '' ? Mode.Create : Mode.Edit;
  const ui = `${view.groups}/form`;

  const options = {
    collection,
  };

  if (mode === Mode.Create) {
    const item = {
      name: '',
      status: '',
      ordering: 0,
      group_acp: 'no',
      description: '',
    };

    res.render(ui, {
      ...options,
      item,
      pageTitle: pageTitleAdd,
    });
  } else {
    const { _id, name, ordering, group_acp, status, description } = await GroupQuery.getUser(id);

    res.render(ui, {
      ...options,
      item: {
        _id,
        name,
        ordering,
        group_acp,
        status,
        description,
      },
      pageTitle: pageTitleEdit,
    });
  }
});

groupsRouter.post('/save', checkSchema(validationSchema), async (req, res) => {
  const item = {
    name: req.body.name,
    status: req.body.status,
    ordering: parseInt(req.body.ordering),
    group_acp: req.body.group_acp,
    description: req.body.description,
  };

  const itemId = req.body.id;

  const { isError, errors } = useValidation(req);
  const mode = item && itemId ? Mode.Edit : Mode.Create;
  const ui = `${view.groups}/form`;

  const options = {
    item,
    errors,
    collection,
  };

  if (mode === Mode.Edit) {
    if (!isError) {
      return res.render(ui, {
        ...options,
        pageTitle: pageTitleEdit,
      });
    } else {
      await GroupQuery.save(itemId, item, {
        modify: {
          user_name: 'admin',
          user_id: 0,
        },
      });

      req.flash('success', util.format(UPDATE_SUCCESS_MESSAGE, ''), linkIndex);
    }
  } else {
    if (!isError) {
      res.render(ui, {
        ...options,
        pageTitle: pageTitleAdd,
      });
    } else {
      await GroupQuery.save('', item, {
        created: {
          user_name: 'admin',
          user_id: 0,
        },
        modify: {
          user_name: 'admin',
          user_id: 0,
        },
      });

      req.flash('success', util.format(CREATE_SUCCESS_MESSAGE, ''), linkIndex);
    }
  }
});

groupsRouter.get('/sort/:sortField/:sortType', async (req, res) => {
  req.session.sort_field = getParam(req.params, 'sortField', 'ordering');
  req.session.sort_type = getParam(req.params, 'sortType', 'asc');

  res.redirect(linkIndex);
});

groupsRouter.get('/change-groups/:id/:group_acp', async (req) => {
  const currentGroups = getParam(req.params, 'group_acp', 'yes');
  const id = getParam(req.params, 'id', '');
  const group_acp = currentGroups === 'yes' ? 'no' : 'yes';

  const options = {
    group_acp,
    modify: {
      user_name: 'admin',
      user_id: 0,
    },
  };

  await GroupQuery.changeGroup(id, options);

  req.flash('success', util.format(UPDATE_SUCCESS_MESSAGE, ''), linkIndex);
});

module.exports = groupsRouter;
