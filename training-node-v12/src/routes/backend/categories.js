const express = require('express');
const util = require('node:util');
const { checkSchema } = require('express-validator');

const systemConfig = require('@src/config/system');
const { config } = require('@src/config/database');
const CategoryQuery = require('@src/models/categories');
const MenuQuery = require('@src/models/menus');

const { createStatusFilter } = require('@src/helper/utils');
const { getParam } = require('@src/helper/param');

const { validationSchema } = require('@src/validation/categories');

const {
  UPDATE_SUCCESS_MESSAGE,
  CREATE_SUCCESS_MESSAGE,
  DELETE_SUCCESS_MESSAGE,
} = require('@src/helper/notify');
const { categories: collection } = config.collection;

const router = express.Router();

const pageTitle = 'Categories Manager ';
const pageTitleAdd = pageTitle + 'Add';
const pageTitleEdit = pageTitle + 'Edit';

const linkIndex = `/${systemConfig.prefixAdmin}/${collection}`;

const { view } = require('@src/config/view');
const { useValidation } = require('@src/hook/useValidation');
const { Mode } = require('@src/config/system');
const { useChangeStatus, useGroupRequest } = require('@src/hook/group');

router.get('(/status/:status)?', async (req, res, _next) => {
  const { currentStatus, currentPage, keyword, sortType, sortField } = useGroupRequest(req);
  const ui = `${view.categories}/list`;

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

  pagination.totalItems = await CategoryQuery.count(condition);

  const { totalItemsPage } = pagination;

  const items = await CategoryQuery.list(condition, conditionSort, currentPage, totalItemsPage);

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

router.get('/change-status/:id/:status', async (req, _res, _next) => {
  const { id, status } = useChangeStatus(req);

  await CategoryQuery.changeStatus(id, status, {
    modify: {
      user_name: 'admin',
      user_id: 0,
    },
  });

  req.flash('success', util.format(UPDATE_SUCCESS_MESSAGE, ''), linkIndex);
});

router.get('/delete/:id', async (req) => {
  const id = getParam(req.params, 'id', '');

  await CategoryQuery.delete(id);

  req.flash('success', util.format(DELETE_SUCCESS_MESSAGE, ''), linkIndex);
});

router.post('/change-status/:status', async (req) => {
  const currentStatus = getParam(req.params, 'status', 'active');

  const results = await CategoryQuery.changeStatus(req.body.cid, currentStatus, {
    modify: {
      user_name: 'admin',
      user_id: 0,
    },
  });

  req.flash('success', util.format(UPDATE_SUCCESS_MESSAGE, results.matchedCount), linkIndex);
});

router.post('/delete', async (req, _res, _next) => {
  const results = await CategoryQuery.delete(req.body.cid);

  req.flash(
    'success',
    util.format(DELETE_SUCCESS_MESSAGE, `${results.deletedCount} items`),
    linkIndex
  );
});

router.post('/change-ordering', async (req, _res, _next) => {
  let cid = req.body.cid;
  let ordering = req.body.ordering;

  if (Array.isArray(cid)) {
    const updatedResults = await CategoryQuery.changeOrdering(cid, ordering, {
      modify: {
        user_name: 'admin',
        user_id: 0,
      },
    });

    const count = updatedResults.flatMap((result) => result.matchedCount).length;

    req.flash('success', util.format(UPDATE_SUCCESS_MESSAGE, `${count} ordering`), linkIndex);
  } else {
    await CategoryQuery.changeOrdering(cid, ordering, {
      modify: {
        user_name: 'admin',
        user_id: 0,
      },
    });

    req.flash('success', util.format(UPDATE_SUCCESS_MESSAGE, 'ordering'), linkIndex);
  }
});

router.get('/form(/:id)?', async (req, res, _next) => {
  const id = getParam(req.params, 'id', '');
  const mode = id === '' ? Mode.Create : Mode.Edit;
  const ui = `${view.categories}/form`;

  const options = {
    collection,
  };

  const menus = await MenuQuery.getMenus({ status: 'active' });

  if (mode === Mode.Create) {
    const item = {
      name: '',
      status: '',
      ordering: 0,
      description: '',
      menu: '',
      menus,
    };

    res.render(ui, {
      ...options,
      item,
      pageTitle: pageTitleAdd,
    });
  } else {
    const { _id, name, menu, ordering, status, description } = await CategoryQuery.getUser(id);

    console.log('meenu: ', menu, menus);

    res.render(ui, {
      ...options,
      pageTitle: pageTitleEdit,
      item: {
        _id,
        name,
        menu,
        menus,
        ordering,
        status,
        description,
      },
    });
  }
});

router.post('/save', checkSchema(validationSchema), async (req, res, _next) => {
  const item = {
    name: req.body.name,
    status: req.body.status,
    menu: req.body.menu,
    ordering: parseInt(req.body.ordering),
    description: req.body.description,
  };

  const itemId = req.body.id;

  const { isError, errors } = useValidation(req);
  const mode = item && itemId ? Mode.Edit : Mode.Create;
  const ui = `${view.categories}/form`;

  const menus = await MenuQuery.getMenus({ status: 'active' });

  const options = {
    item,
    errors,
    collection,
    menus,
  };

  if (mode === Mode.Edit) {
    if (!isError) {
      res.render(ui, {
        ...options,
        pageTitle: pageTitleEdit,
      });
    } else {
      const { _id, slug } = await MenuQuery.getMenu(item.menu);
      const fields = {
        ...item,
        menu: {
          id: _id,
          slug,
        },
      };
      await CategoryQuery.save(itemId, fields, {
        modify: {
          user_name: 'admin',
          user_id: 0,
        },
      });

      req.flash('success', util.format(UPDATE_SUCCESS_MESSAGE), linkIndex);
    }
  } else {
    if (!isError) {
      res.render(ui, {
        ...options,
        pageTitle: pageTitleAdd,
      });
    } else {
      const { _id, slug } = await MenuQuery.getMenu(item.menu);
      const fields = {
        ...item,
        menu: {
          id: _id,
          slug,
        },
      };

      await CategoryQuery.save('', fields, {
        created: {
          user_name: 'admin',
          user_id: 0,
        },
        modify: {
          user_name: 'admin',
          user_id: 0,
        },
      });

      req.flash('success', util.format(CREATE_SUCCESS_MESSAGE), linkIndex);
    }
  }
});

router.get('/sort/:sortField/:sortType', async (req, res, _next) => {
  req.session.sort_field = getParam(req.params, 'sortField', 'ordering');
  req.session.sort_type = getParam(req.params, 'sortType', 'asc');

  res.redirect(linkIndex);
});

module.exports = router;
