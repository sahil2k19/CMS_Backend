const { DataTypes } = require("sequelize");
const sequelize = require("../connection");




const articles = sequelize.define('articles', {
    title:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:true,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:true,
    }
})

module.exports = articles;