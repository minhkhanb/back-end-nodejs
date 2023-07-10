const { getParam } = require('@src/helper/param');
const useGroupRequest = (req) => {
  const currentStatus = getParam(req.params, 'status', 'all');
  const currentPage = parseInt(getParam(req.query, 'page', 1));
  const keyword = getParam(req.query, 'keyword', '');
  const groupId = getParam(req.params, 'groupId', '');

  let sortField = getParam(req.session, 'sort_field', 'ordering');
  let sortType = getParam(req.session, 'sort_type', 'asc');
  let groupIdSession = getParam(req.session, 'group_id', '');

  return {
    currentStatus,
    currentPage,
    keyword,
    sortType,
    sortField,
    groupId,
    groupIdSession,
  };
};

const useChangeStatus = (req) => {
  const currentStatus = getParam(req.params, 'status', 'active');
  const id = getParam(req.params, 'id', '');
  const status = currentStatus === 'active' ? 'inactive' : 'active';

  return {
    id,
    status,
  };
};

module.exports = {
  useGroupRequest,
  useChangeStatus,
};
