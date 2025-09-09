import { Server } from "socket.io";
import http from "http";
import express from "express";

const app=express();

const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:"https://chat-web-app-wdle.onrender.com",
        methods:["GET","POST"],

    }
});

//realtime message code goes here
export const getReceiverSocketId = (recieverId)=>{
      return users[recieverId];
}

const users= {};
io.on("connection", (socket)=>{
    console.log("user is connected",socket.id);
    const userId = socket.handshake.query.userId;
    if(userId){
        users[userId]=socket.id;
        console.log("Hello",users);
    }
    //used to send the events to all connected users
    io.emit("getOnlineUsers",Object.keys(users));


socket.on("disconnect", ()=>{
    console.log("user is disconnected",socket.id);
    delete users[userId];
    io.emit("getOnlineUsers",Object.keys(users));
})});

export {app,io,server}