var express = require('express');
var router = express.Router();
const usersSchema = require(__path_schema + 'users')
const usersModels = require(__path_models + 'users')
const groupsModels = require(__path_models + 'groups')
const groupsSchema = require(__path_schema + 'groups')
const ultilsHelper = require(__path_helper + 'utils')
const paramHelper = require(__path_helper + 'param')
const systemConfig = require(__path_config +'system');
const linkIndex 		= '/' + systemConfig.prefixAdmin + '/' + 'users';
const pageTitle     = 'Users Manager '    
const pageTitleAdd     = pageTitle + 'Add'
const pageTitleEdit     = pageTitle + 'Edit'
const { body, validationResult } = require('express-validator');

// list
router.get('(/status/:status)?', async (req, res, next)=>{
  let params = {}
  params.currentStatus = paramHelper.getParam(req.params, 'status', 'all')
  params.keywork = paramHelper.getParam(req.query, 'keywork', '')
  let statusFillter = await ultilsHelper.createStatusFillter(params.currentStatus, 'users')
 
  params.sortFied = paramHelper.getParam(req.session, 'sort_fied', 'fullName')
  params.sortType = paramHelper.getParam(req.session, 'sort_type', 'asc')
  params.groupID = paramHelper.getParam(req.session, 'group_id', '')
  
  let groupItems = []
  await usersModels.listItemsInSelecbox().then(items=>{
    groupItems = items;
    groupItems.unshift({id: 'allvalue', name: 'All groups'})
  })
  params.pagination = {
        totalItems: 1,
        totalItemsPage: 7,
        currentPage: parseInt(paramHelper.getParam(req.query, 'page', 1)) ,
        pageRanges: 3
  }
    
  await  usersModels.countItems(params).then((data)=>{
    params.pagination.totalItems = data
    })
 
    usersModels.listItems(params)
    .then((items)=>{
       res.render(__path_views +'page/users/list', { 
         pageTitle: pageTitle, 
         items: items,
         statusFillter: statusFillter,
         groupItems: groupItems,
         params:params
       })
     })
});

// change-status
router.get('/change-status/:id/:status', function(req, res, next) {
  let currentStatus = paramHelper.getParam(req.params, 'status', 'active');
  let id = paramHelper.getParam(req.params, 'id', '');
  usersModels.changeStatus(id,currentStatus,{task:'update-one'}).then((result)=>{
    req.flash('success', 'Cập nhật trạng thái thành công', linkIndex)
  });
 });

// delete
router.get('/delete/:id', function(req, res, next) {
  let id = paramHelper.getParam(req.params, 'id', '');
  usersModels.deleteItems(id,{task:'delete-one'}).then((result)=>{
    req.flash('success', 'Xóa phần tử thành công', linkIndex)
  });
 });


// change-status multi
router.post('/change-status/:status',async (req, res, next) => {
  let currentStatus = paramHelper.getParam(req.params, 'status', 'active');
  usersModels.changeStatus(req.body.cid, currentStatus,{task:'update-multi'}).then((result)=>{
   req.flash('success', `Thay đổi ${result.matchedCount} trạng thái phần tử thành công`, linkIndex)
 })
  
 });

 // delete multi
 router.post('/delete', async (req, res, next) => {
  usersModels.deleteItems(req.body.cid, {task:'delete-multi'}).then((result)=>{
    req.flash('success', `Xóa ${result.deletedCount} phần tử thành công`, linkIndex)
  });
 });

// change-odering
router.post('/change-ordering',async (req, res, next) => {
  let cids = req.body.cid
  let oderings = req.body.ordering
  usersModels.changeOrdering(cids, oderings, null).then((result)=>{
  req.flash('success', 'Thay đổi ordering phần tử thành công', linkIndex)
})

 });


// form
router.get('/form(/:id)?', async function(req, res, next) {
  let id = paramHelper.getParam(req.params, 'id', '');
  let item = {name: '', ordering: '', status: '', group_id: '',group_name: ''}
  let showError = null
  let groupItems = []
  await usersModels.listItemsInSelecbox().then(items=>{
    groupItems = items;
    groupItems.unshift({id: 'novalue', name: 'choose groups'})
  })
if(id === ''){ //add
  res.render(__path_views +'page/users/form', { pageTitle: pageTitleAdd,item: item, showError,groupItems})
}else{
  await usersModels.getItems(id).then((item)=>{
  item.group_id = item.group.id
  item.group_name = item.group.name
  res.render(__path_views +'page/users/form', { pageTitle: pageTitleEdit, item:item, showError,groupItems })
 })
}
 });

// save
 router.post('/save', 
 body('userName')
  .isLength({min:5, max:100})
  .withMessage('độ dài phải từ 5 đến 100')
  .custom(async (value, { req }) => {
    return await usersSchema.findOne({name:value}).then(async(user)=>{
      if(user){
        return Promise.reject('trùng tên')
      }
    });
  }), 
body('ordering')
  .isInt({min:0, max:100})
  .withMessage('ordering từ 0 đến 100'),
body('status')
  .not()
  .isIn(['novalue'])
  .withMessage('chọn 1 trạng thái'),
body('group_id')
  .not()
  .isIn(['allvalue'])
  .withMessage('chọn 1 group'),  
 async (req, res, next) => {

  const errors = validationResult(req);
  req.body = JSON.parse(JSON.stringify(req.body));
  let item = Object.assign(req.body)
  if(item !== 'undefined', item.id !== ''){ // edit

    if(!errors.isEmpty()){ //có lỗi
      let groupItems = []
      await  usersModels.listItemsInSelecbox().then(items=>{
        groupItems = items;
        groupItems.unshift({id: 'novalue', name: 'choose groups'})
      })
      res.render('page/users/form', { 
        pageTitle: pageTitleEdit, 
        item:item, 
        showError: errors.errors,
        groupItems:groupItems
      })
    }else{ //không lỗi
      usersModels.saveItems(item,{task: 'edit'}).then((result)=>{
        req.flash('success', 'Thay đổi phần tử thành công', linkIndex)
      });
    }
  }else{ //addNew
    if(!errors.isEmpty()){ //có lỗi
      let groupItems = []
      await usersModels.listItemsInSelecbox().then(items=>{
        groupItems = items;
        groupItems.unshift({id: 'novalue', name: 'choose groups'})
      })
      res.render('page/users/form', { 
        pageTitle: pageTitleAdd, 
        item:item, 
        showError: errors.errors,
        groupItems: groupItems
      })
    }else{ //không lỗi
      usersModels.saveItems(item,{task: 'add'}).then(()=>{
        req.flash('success', 'Thêm mới phần tử thành công', linkIndex)
       })
    }
     
  }
 });

//  sort
 router.get('/sort/:sort_fied/:sort_type', async function(req, res, next) {
  req.session.sort_fied  = paramHelper.getParam(req.params, 'sort_fied', 'ordering');
  req.session.sort_type = paramHelper.getParam(req.params, 'sort_type', 'asc');
  res.redirect(linkIndex)
 });

//  fillter
router.get('/fillter-group/:group_id', async function(req, res, next) {
  req.session.group_id  = paramHelper.getParam(req.params, 'group_id', '');
 
  res.redirect(linkIndex)
 });

module.exports = router;
