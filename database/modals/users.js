const { DataTypes } = require("sequelize");
const sequelize = require("../connection");




const users = sequelize.define('users', {
    name:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:true,
    }
})

module.exports = users;