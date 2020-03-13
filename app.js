//入口程序
//引入http服务模块
const config=require('./config/config')
const httpServer = require("./service/httpServer");

//引入聊天模块
const chat = require("./chat");


//启动 服务
httpServer.listen(config.port);
console.log(`您的服务已经运行在 http://127.0.0.1:`+config.port);
