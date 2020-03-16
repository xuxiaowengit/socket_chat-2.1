//配置socket.io 服务模块 , 依赖于httpServer 模块
const httpServer = require("./httpServer");
const io = require("socket.io");

// Socket.io 的配置参数
const options = {
    path:"/chat",
    httpOnly: false
}

let chatServer = io(httpServer,options);


//导出chatServer对象
module.exports = chatServer;