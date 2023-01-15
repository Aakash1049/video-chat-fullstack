const express=require("express")
const app=require("express")()
const server = require("http").createServer(app)
const cors=require("cors")
const io=require("socket.io")(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
})
app.use(cors())

const PORT=process.env.PORT || 5000
 app.get("/",(req,res)=>{
    res.send("server is running")
})

io.on("connection",(socket)=>{
    socket.emit("me",socket.id)
    socket.on("disconnect",()=>{
        socket.broadcast.emit("callended")
    })
    socket.on("calluser",({userToCall,signalData, from, name})=>{
        io.to(userToCall).emit("calluser",{signal:signalData,from, name})
    })
    socket.on("answercall",(data)=>{
        io.to(data.to).emit("callaccepted",data.signal)
    })
})
if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }
server.listen(PORT,()=>{
    console.log("Server listening on ", PORT)
})