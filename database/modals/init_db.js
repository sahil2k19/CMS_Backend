const articles = require("./articles");
const users = require("./users");




articles.belongsTo(users, {
    foreignKey: 'userId',
    as: 'user',
});

users.hasMany(articles, {
    foreignKey: 'userId',
    as: 'articles',
})

module.exports = {articles, users}