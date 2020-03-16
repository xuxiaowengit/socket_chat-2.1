//负责处理http 服务请求 模块

const http = require("http");
const express = require("express");
const path = require("path");

var cookieParser = require('cookie-parser');

//导入自定义中间件- 处理uuid
const createUUID  = require("./createUID");

//导入路由模块
const routerInit  = require("../router");
const app = express();
const server = http.createServer(app);

//配置静态资源目录
app.use(express.static(path.join(process.cwd(),"static")));

app.use(cookieParser());


//初始化路由
routerInit(app);

//配置一个自定义express中间件 ：用于检测用户是否具有uuid cookie ，如果没有，则创建一个uuid
app.use(createUUID());

module.exports = server;