const { DataTypes } = require("sequelize");
const sequelize = require("../connection");




const articles2 = sequelize.define('articles2', {
    title:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    paragraph:{
        type:DataTypes.TEXT,
        allowNull:true,
    },
    tags:{
        type:DataTypes.JSON,
        allowNull:true,
    },
    Category:{
        type:DataTypes.JSON,
        allowNull:true,
    },
    visibility:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:true,
    }
})

module.exports = articles2;