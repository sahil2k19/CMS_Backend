const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('testing', 'root', 'sahilgagan',{
    host:'localhost',
    dialect:'mysql'
})

module.exports = sequelize;
