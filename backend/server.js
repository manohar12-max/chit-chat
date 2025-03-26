
const express= require('express')
const { chats } = require('./data/data')
const cors = require("cors");
const dotenv= require("dotenv");
const connectDB = require('./config/db');
const userRoute=require("./routes/userRoute")
const chatRoute=require("./routes/chatRoute")
const messageRoute = require("./routes/messageRoute")
const {notFound,errorHandler}=require("./middleware/errorMiddleware")
const path=require("path")
dotenv.config() 
connectDB()
const app=express()
app.use(
    cors(
    //   {
    //     origin: process.env.FRONTEND_URL, // Allow only your frontend
    //     methods: "GET,POST,PUT,DELETE",
    // }
  )
  );
app.use(express.json())




app.use("/api/user",userRoute)
app.use("/api/chat",chatRoute)
app.use("/api/message",messageRoute)

// ---------------Deployment---------------
// const __dirname1 = path.resolve();
// if(process.env.NODE_ENV=="production"){
//   app.use(express.static(path.join(__dirname1,'/frontend/dist')))
//   app.get("*",(req, res)=>{
//     res.sendFile(path.resolve(__dirname1,'frontend','dist','index.html'))
//   })
// }else{
//   app.get("/", (req, res) => {
//     res.sendFile("Api running successfully")
//   })
// }

// ---------------Deployment---------------

app.use(notFound)
app.use(errorHandler)

const server=app.listen(process.env.PORT || 5000, console.log("Server listening on port 5000"))
const io=require("socket.io")(server,{
  pingTimeout:60000,// the amount of time it will wait while being inactive if user is inactive for more than 60s the connection will go off saving bandwindth
  cors: {
    origin: "http://localhost:5173",
    
  },
})

// onclient connect
io.on("connection",(socket)=>{
  console.log("new client connected",socket.id)
  
  socket.on('setup',(userData)=>{  // creating a new socket where the frontend will send data and join a room
    socket.join(userData._id)   // from frontend we will send user id and will join with this socket and create a new room
    socket.emit("Connected and created room with server")
  })
  socket.on('join chat',(room)=>{
    socket.join(room)
    console.log("client joined room",room)
  })
  socket.on('new message',(newMessageReceived)=>{
    console.log(newMessageReceived)
       var chat=newMessageReceived.chat
       if(!chat.users)return console.log("chat.users not defined")
       chat.users.forEach(user=>{
      if(user._id===newMessageReceived.sender._id)return
      socket.in(user._id).emit('message received',newMessageReceived)
      }) 
  })
  socket.off('setup',()=>{
    console.log("client disconnected",socket.id)
    socket.leave(userData._id)
  })
} )

