const articles = require("./articles");
const articles2 = require("./articles2");
const users = require("./users");




articles.belongsTo(users, {
    foreignKey: 'userId',
    as: 'user',
});
articles2.belongsTo(users, {
    foreignKey: 'userId',
    as: 'user',
});


users.hasMany(articles, {
    foreignKey: 'userId',
    as: 'articles',
})

module.exports = {articles, users}