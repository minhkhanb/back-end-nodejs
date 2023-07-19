var express = require('express');
var router = express.Router();

const routerName = 'home'
const layout = __path_views_frontend + 'frontend'
const folderView = __path_views_frontend + `/pages/${routerName}/`;
const acticlesModels = require(__path_models + 'acticles')

router.get('/', async function(req, res, next) {
  await  acticlesModels.listItemsPosition().then((items)=>{
        res.render(`${folderView}index`, { 
            layout: layout,
            top_post: true,
            items
         })
    })
 
});

module.exports = router;