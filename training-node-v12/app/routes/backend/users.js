const express = require('express');
const util = require('node:util');
const { checkSchema } = require('express-validator');

const systemConfig = require('@src/config/system');
const { config } = require('@src/config/database');
const userModels = require('@src/models/users');
const GroupQuery = require('@src/models/groups');

const { createStatusFilter } = require('@src/helper/utils');
const { getParam } = require('@src/helper/param');
const { uploadFile } = require('@src/helper/upload');

const { validationSchema } = require('@src/validation/users');

const {
  UPDATE_SUCCESS_MESSAGE,
  CREATE_SUCCESS_MESSAGE,
  DELETE_SUCCESS_MESSAGE,
} = require('@src/helper/notify');
const { view } = require('@src/config/view');
const { useGroupRequest, useChangeStatus } = require('@src/hook/group');
const { useValidation } = require('@src/hook/useValidation');
const { Mode } = require('@src/config/system');
const { users: collection } = config.collection;

const router = express.Router();

const pageTitle = 'Users Manager ';
const pageTitleAdd = pageTitle + 'Add';
const pageTitleEdit = pageTitle + 'Edit';

const linkIndex = `/${systemConfig.prefixAdmin}/${collection}`;

const upload = uploadFile();

router.get('(/status/:status)?', async (req, res, _next) => {
  const { currentStatus, currentPage, keyword, sortType, sortField, groupIdSession } =
    useGroupRequest(req);
  const ui = `${view.users}/list`;

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

  const groups = await GroupQuery.getGroups();

  if (currentStatus !== 'all') {
    condition.status = currentStatus;
  }

  if (keyword !== '') {
    condition.name = new RegExp(keyword, 'i');
  }

  if (groupIdSession !== '' && groupIdSession !== 'novalue') {
    condition = {
      ...condition,
      'group.id': groupIdSession,
    };
  }

  pagination.totalItems = await userModels.count(condition);

  const { totalItemsPage } = pagination;

  const items = await userModels.list(condition, conditionSort, currentPage, totalItemsPage);

  const options = {
    pageTitle,
    items,
    sortFilter,
    pagination,
    collection,
  };

  res.render(ui, {
    ...options,
    groups,
    groupId: groupIdSession,
  });
});

router.get('/change-status/:id/:status', async (req) => {
  const { id, status } = useChangeStatus(req);

  await userModels.changeStatus(id, status, {
    modify: {
      user_name: 'admin',
      user_id: 0,
    },
  });

  req.flash('success', UPDATE_SUCCESS_MESSAGE, linkIndex);
});

router.get('/delete/:id', async (req) => {
  const id = getParam(req.params, 'id', '');

  await userModels.delete(id);

  req.flash('success', util.format(DELETE_SUCCESS_MESSAGE, ''), linkIndex);
});

router.post('/change-status/:status', async (req) => {
  const currentStatus = getParam(req.params, 'status', 'active');

  const results = await userModels.changeStatus(req.body.cid, currentStatus, {
    modify: {
      user_name: 'admin',
      user_id: 0,
    },
  });

  req.flash('success', util.format(UPDATE_SUCCESS_MESSAGE, results.matchedCount), linkIndex);
});

router.post('/delete', async (req) => {
  const results = await userModels.delete(req.body.cid);

  req.flash(
    'success',
    util.format(DELETE_SUCCESS_MESSAGE, `${results.deletedCount} groups`),
    linkIndex
  );
});

router.post('/change-ordering', async (req) => {
  let cid = req.body.cid;
  let ordering = req.body.ordering;

  if (Array.isArray(cid)) {
    const updatedResults = await userModels.changeOrdering(cid, ordering, {
      modify: {
        user_name: 'admin',
        user_id: 0,
      },
    });

    const count = updatedResults.flatMap((result) => result.matchedCount).length;

    req.flash('success', util.format(UPDATE_SUCCESS_MESSAGE, `${count} ordering`), linkIndex);
  } else {
    await userModels.changeOrdering(cid, ordering, {
      modify: {
        user_name: 'admin',
        user_id: 0,
      },
    });

    req.flash('success', util.format(UPDATE_SUCCESS_MESSAGE, 'ordering'), linkIndex);
  }
});

router.get('/form(/:id)?', async (req, res) => {
  const id = getParam(req.params, 'id', '');
  const mode = id === '' ? Mode.Create : Mode.Edit;
  const ui = `${view.users}/form`;

  const options = {
    collection,
  };

  const groups = await GroupQuery.getGroups();

  if (mode === Mode.Create) {
    const item = {
      username: '',
      fullname: '',
      email: '',
      group: '',
      ordering: 0,
      status: '',
      description: '',
    };

    res.render(ui, {
      ...options,
      item,
      pageTitle: pageTitleAdd,
      groups,
    });
  } else {
    const { _id, username, fullname, email, group, ordering, status, description } =
      await userModels.getById(id);

    res.render(ui, {
      ...options,
      item: {
        _id,
        username,
        fullname,
        email,
        status,
        ordering,
        group: group.id,
        description,
      },
      pageTitle: pageTitleEdit,
      groups,
    });
  }
});

router.post('/save', checkSchema(validationSchema), async (req, res) => {
  const item = {
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
    group: req.body.group,
    status: req.body.status,
    ordering: parseInt(req.body.ordering),
    description: req.body.description,
  };

  const itemId = req.body.id;

  const { isError, errors } = useValidation(req);
  const mode = item && itemId ? Mode.Edit : Mode.Create;
  const ui = `${view.users}/form`;

  const groups = await GroupQuery.getGroups();

  const options = {
    item,
    errors,
    collection,
    groups,
  };

  if (mode === Mode.Edit) {
    if (!isError) {
      res.render(ui, {
        ...options,
        item,
        itemId,
        pageTitle: pageTitleEdit,
      });
    } else {
      await userModels.save(itemId, item);

      req.flash('success', util.format(UPDATE_SUCCESS_MESSAGE, ''), linkIndex);
    }
  } else {
    if (!isError) {
      res.render(ui, {
        ...options,
        item,
        itemId,
        pageTitle: pageTitleAdd,
      });
    } else {
      const { _id, name } = await GroupQuery.getUser(item.group);
      const fields = {
        ...item,
        group: {
          id: _id,
          name,
        },
      };

      await userModels.save('', fields, {
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

router.get('/sort/:sortField/:sortType', async (req, res) => {
  const { sortType, sortField } = useGroupRequest(req);

  req.session.sort_field = sortField;
  req.session.sort_type = sortType;

  res.redirect(linkIndex);
});

router.get('/filter-group/:groupId', async (req, res) => {
  const { groupId } = useGroupRequest(req);

  req.session.group_id = groupId;

  res.redirect(linkIndex);
});

router.get('/upload', async (req, res) => {
  const ui = `${view.users}/upload`;
  const options = {
    pageTitle: pageTitleEdit,
  };

  res.render(ui, options);
});

router.post('/upload', upload.single('upload_file'), async (req, res) => {
  const ui = `${view.users}/upload`;
  const options = {
    pageTitle: pageTitleEdit,
  };

  res.render(ui, options);
});

module.exports = router;
