const query = require("../db/query");

//获取在线用户控制器
const getOnlineClinet = (req,res)=>{
    //查询数据 
    const sql = `SELECT * FROM clients WHERE status = 1;`;
    query(sql).then((data)=>{
        let json = {
            code:200,
            msg:"success",
            data
        }
        res.json(json);
    })
}

//获取客户端的聊天信息记录 
const getClientChat = (req,res)=>{
    // 获取当前访问用户的uuid
    let uuid = req.cookies.uuid;
    const sql = `SELECT * FROM contents WHERE from_user = '${uuid}' OR to_user = '${uuid}' AND status = '1' `; //AND from_type='client'  加此仅获取客户自己发的
    query(sql).then((data)=>{
        let json = {
            code:200,
            msg:"success",
            data
        }
        console.log('查询聊天记录:',data)
        res.json(json);
    })
}

//获取客户端的聊天信息记录 
const getServerChat = (req,res)=>{
    // 获取当前访问用户的uuid
    let uuid = req.cookies.uuid;
    const sql = `SELECT * FROM contents WHERE from_user = '${uuid}' OR to_user = '${uuid}' AND status = '1' `; //AND from_type='client'  加此仅获取客户自己发的
    query(sql).then((data)=>{
        let json = {
            code:200,
            msg:"success",
            data
        }
        console.log('查询客服端历史聊天记录:',data)
        res.json(json);
    })
}

module.exports = {
    getOnlineClinet,
    getClientChat,
    getServerChat
}