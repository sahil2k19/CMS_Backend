const dotenv = require('dotenv');
dotenv.config()
const express = require('express');
const sequelize = require('./database/connection');
const bcrypt = require('bcrypt')
const users = require('./database/modals/users');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const articles = require('./database/modals/articles');
const { Sequelize } = require('sequelize');
const articles2 = require('./database/modals/articles2');
const app = express();

app.use(cors())
app.use(express.json())

app.get('/', (req,res)=>{
    res.send('hellow')
})

app.post('/register',async(req,res)=>{
    const {name, email, password} = req.body;
    try {
        if(!email || !name || !password){
            return res.json({mesage:"Require Field cannot be empty"})
        }
        const user = await users.findOne({
            where:{
                email
            }
        })
        if(user){
            return res.status(400).json({message:"user Already Exist", exist:true});
        }
        const hashedPass = await bcrypt.hash(password, 10); 

        const newUser = await users.create({name, email, password:hashedPass});
        return res.json({
            message:'succesfully created new user',
            result:newUser
        })
    } catch (error) {
        return res.json(error)
    }
})

app.post('/login',async(req,res)=>{
    const {email, password} = req.body;
    console.log(req.body)
    try {
        const user = await users.findOne({
            where:{
                email
            }
        })
        if(!user){
            return res.status(400).json({
                message:"user not exist"
            })
        }
        const checkPass = await bcrypt.compare(password, user?.password);
        if(checkPass){
            const token = jwt.sign({name:user?.name, email:user?.email }, "new secret key", {expiresIn:"1h"})
            return res.json({
                message:'successfully login',
                result:user,
                token
            })
        }
        else{
            return res.status(401).json({
                message:'IncorrectPass'
            })
        }
    } catch (error) {
        return res.json({
            message:"internal server error",
            error:error.message
        })
    }
})

// create article
app.post('/article',async(req,res)=>{
    const body= req.body;
    try {
        const article = await articles2.create(body);
        return res.json({message:"successfully created article", result:article})
    } catch (error) {
        return res.json(error)
    }
})
const articleAttributes = 
{
        include: [
            [Sequelize.literal('(SELECT name FROM users WHERE users.id = articles.userId)'), 'author']
        ]
    }


app.get('/article/all/:userId',async(req,res)=>{
    const {userId} = req.params;
    try {
        const article = await articles2.findAll({
            where:{userId},
            // attributes: articleAttributes
        });
        return res.json({message:"successfully get all articles", result:article})
    } catch (error) {
        return res.json(error)
    }
})
app.get('/article/all/',async(req,res)=>{
    const {userId} = req.params;
    try {
        const article = await articles2.findAll({
            // attributes: articleAttributes
        });
        return res.json({message:"successfully get all articles", result:article})
    } catch (error) {
        return res.json(error)
    }
})

app.get('/article/:id',async(req,res)=>{
    const {id} = req.params;
    try {
        const article= await articles2.findOne({
            where:{id},
            // attributes: articleAttributes
        });
        return res.json({message:"successfully get all articles", result:article})
    } catch (error) {
        return res.json(error)
    }
})

app.put('/article/:id',async(req,res)=>{
    const {id} = req.params;
    const body = req.body;
    try {
        const article= await articles2.update(body,{
            where:{id},
           
        });
        return res.json({message:"successfully get all articles", result:article})
    } catch (error) {
        return res.json(error)
    }
})

app.delete('/article/:id',async(req,res)=>{
    const {id} = req.params;
    try {
        const article= await articles2.destroy({
            where:{id}
        });
        return res.json({message:"successfully delete articles"})
    } catch (error) {
        return res.json(error)
    }
})



app.listen(2100, ()=>{
    console.log('app running on 2100')
})

sequelize.sync({alter:true, logging:false})
.then(()=>{
    console.log('sequelize synced')
}).catch((err)=>{
    console.log(err)
})