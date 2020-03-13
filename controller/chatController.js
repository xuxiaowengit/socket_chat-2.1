const path = require("path");

//客户端控制器 - client
const clientController = (req,res)=>{
    res.sendFile(path.join(process.cwd(),"views","client.html"));
}

//客服端控制器 - server
const serverController = (req,res)=>{
    res.sendFile(path.join(process.cwd(),"views","server.html"));
}

module.exports = {
    clientController,
    serverController
}