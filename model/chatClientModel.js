// 用于处理 client 端的数据模型操作
const query = require("../db/query");

//处理用户上线记录操作 - 当用户上线的时记录
const insertClientOnLine = (data)=>{//data 就是执行操作的时候需要记录的 ： uuid , sid , nick , ip
    const sql = `INSERT INTO clients (uuid,sid,nick,ip,status) VALUES ('${data.uid}','${data.sid}','${data.nick}','${data.ip}','${data.status}');`;
    console.log('插入新用户纪录')
    return query(sql);
}

//查询当前uuid是否一个新用户
const queryClinetUUID = ( uuid )=>{
    const sql = `SELECT * FROM clients WHERE uuid ='${uuid}';`;
    console.log('查询是否为新用户')
    return query(sql);
}

//更新用户的在线状态
const updateClientStatus = ( uuid ,sid )=>{
    const sql = `UPDATE clients SET status='0' WHERE uuid = '${uuid}' AND sid='${sid}' AND status =1;`;
    console.log('更新用户在线')
    return query(sql);
}

//查询所有的在线用户
const queryAllOnline = ()=>{
    const sql = `SELECT * FROM clients WHERE status = 1`;
    console.log('查询所有在线用户')
    return query(sql);
}


// 导出client查询的model
module.exports = {
    insertClientOnLine,
    queryClinetUUID,
    updateClientStatus,
    queryAllOnline,
}