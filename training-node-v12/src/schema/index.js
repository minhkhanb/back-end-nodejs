const ItemModel = require('@src/schema/items');
const UserModel = require('@src/schema/users');
const GroupModel = require('@src/schema/groups');
const MenuModel = require('@src/schema/menus');
const CategoryModel = require('@src/schema/categories');
const ArticleModel = require('@src/schema/articles');

const models = {
  Item: ItemModel,
  User: UserModel,
  Group: GroupModel,
  Menu: MenuModel,
  Category: CategoryModel,
  Article: ArticleModel,
};

module.exports = models;
