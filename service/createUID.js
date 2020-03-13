//用于处理 cookie 中uuid 的中间件
const uuidLib = require('node-uuid');

let createUUID = ()=>{
    return (req,res,next)=>{ //req , res , next() 下一步
        // console.log('这是中间件模块');
        if(!req.cookies.uuid){//如果没有uuid ，则生成一个uuid
            let uuid = uuidLib.v1();
            res.cookie("uuid",uuid,{maxAge: 365*24*60*60*1000, httpOnly: false});  
            // console.log('当前请求暂无uuid',uuid);
        }else{
            // console.log('当前请求的uuid为：',req.cookies.uuid);
        }
        next();//不执行， 程序会卡在当前位置
    }
}

module.exports = createUUID;