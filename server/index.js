const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const {addUser, removeUser, getUsers, existUser, getRoomers} = require('./userFun.js');
const mongoose = require('mongoose');
const Blog = require('./blogModel');
const Login = require('./loginModel');

app.use(cors());
app.use(express.json());


const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001"
    }
})

app.post('/add', async(req,res) =>{
    const username = req.body.username;
    const text = req.body.text;
    const time = req.body.time;
    const blog = await new Blog({username: username, text: text, time: time})
    try{
        blog.save()
        console.log("udao sie");
    } catch(err) {
        console.log(err);
    }
})
app.get('/get', async(req,res) =>{
    Blog.find({},(err,result) =>{
        if(err)
        {
            res.send(err)
        }
        console.log(result);
        res.send(result);
    })
})
app.post('/desc', async(req,res) =>{
    const username = req.body.username;
    console.log(username);
    const userModel = await Login.findOne({login: username}).exec();
    if(userModel)
    {
        res.send(JSON.stringify(userModel.desc));
    }
    else
    {
        res.send(JSON.stringify("reload please :-)"))
    }
})
app.put('/chdesc', async(req,res) =>{
    const username = req.body.username;
    const desc = req.body.desc;
    console.log(username, desc);
    const userModel = await Login.findOne({login: username}).exec();
    if(userModel)
    {
        Login.updateOne({login: username}, {desc: desc}).exec();
        res.send(JSON.stringify("udalo"));
    }
    else
    {
        res.send(JSON.stringify("error"))
    }
})
app.post('/loginget', async(req,res) =>{
    const login = req.body.login;
    const password = req.body.password;
    const loginModel = await Login.findOne({login: login}).exec();
    if(loginModel && loginModel.password === password)
    {
        res.send(JSON.stringify("good"));
    }
    else
    {
        res.send(JSON.stringify("bad"))
    }

})
app.post('/register', async(req,res) =>{
    const login = req.body.login;
    const password = req.body.password;
    const desc = req.body.desc;
    const account = await Login.findOne({login: login}).exec();
    if(account)
    {
        res.send(JSON.stringify("bad"))
    }
    else
    {
        const log = await new Login({login: login, password: password, desc: desc})
        try{
            log.save()
            res.send(JSON.stringify("good"));
        } catch(err) {
            res.send(JSON.stringify("bad"));
        }
    }

})
io.on("connection", (socket) => {
    
    socket.on('join_room', (data) => {
        if(existUser(data))
        {
            io.to(socket.id).emit('error_join',{});
            const removerUser = removeUser({id: socket.id});
        if(removerUser)
            socket.leave(removerUser.room);
        addUser({id: socket.id, user: data.username, room: data.room});
        const onlineUsers = getUsers()
        io.emit('userData', onlineUsers);
        socket.join(data.room);
        socket.to(data.room).emit('receive_message',{
            room: data.room,
            author: 'admin',
            message: `${data.username} had joined to ${data.room}`,
            time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes() + ':' + new Date(Date.now()).getSeconds(),
        })
        }
        else{
            io.to(socket.id).emit('error_join',{
                room: data.room,
                author: 'admin',
                message: `this username is already taken`,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes() + ':' + new Date(Date.now()).getSeconds(),
            })
        }
    })
    socket.on('send_message', (data) => {
        socket.to(data.room).emit('receive_message',data);
    })
    socket.on("disconnect", () =>{
        const removedUser = removeUser({id: socket.id});
        const onlineUsers = getUsers()
        io.emit('userData', onlineUsers);
        if(removedUser)
        {
            socket.to(removedUser.room).emit('receive_message',{
                room: removedUser.room,
                author: 'admin',
                message: `${removedUser.user} had left`,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes() + ':' + new Date(Date.now()).getSeconds(),
            })
        }
        
    })
})
server.listen(3000, () =>{
    console.log('server run :D');
})