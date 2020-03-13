const chatController = require("../controller/chatController");
const apiController = require("../controller/apiController");

let routerInit = (app)=>{
    //首页路由 - 用户端
    app.get("/",chatController.clientController);

    //客服端路由
    app.get("/server",chatController.serverController)

    //配置客服端获取在线用户接口 api
    app.get("/api/getOnLineClient",apiController.getOnlineClinet);

    //获取客户端聊天记录 api
    app.get("/api/getClientChat",apiController.getClientChat);

    // 客服端获取历史记录
    app.get("/api/getServertChat",apiController.getServerChat);
}

module.exports = routerInit;