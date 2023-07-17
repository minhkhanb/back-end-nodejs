var express = require('express');
var router = express.Router();

const routerName = 'post'
const layout = __path_views_frontend + 'frontend'
const folderView = __path_views_frontend + `/pages/${routerName}/`;
router.get('/', function(req, res, next) {
 res.render(`${folderView}index`, { 
    layout: layout,
    top_post: false
 })
});

module.exports = router;