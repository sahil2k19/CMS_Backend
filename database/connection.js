const {Sequelize} = require('sequelize');

const { DBNAME, DBHOST,DBUSER, DBPASS, DBPORT } = process.env;
const sequelize = new Sequelize(DBNAME, DBUSER, DBPASS, {
    host: DBHOST,
    port: DBPORT,
    dialect: 'mysql',
    dialectModule: require('mysql2'),
});

module.exports = sequelize;
