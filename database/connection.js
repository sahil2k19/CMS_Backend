const {Sequelize} = require('sequelize');

const { DBNAME, DBHOST,DBUSER, DBPASS, DBPORT } = process.env;
console.log(DBNAME, DBHOST,DBUSER, DBPASS, DBPORT)
const sequelize = new Sequelize(DBNAME, DBUSER, DBPASS, {
    host: DBHOST,
    port: DBPORT,
    dialect: 'mysql'
});

module.exports = sequelize;
