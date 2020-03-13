const query = require("../db/query");

//客服上线
const insertServerOnLine = ( data )=>{
    const sql = `INSERT INTO servers (uuid,sid,nick,ip,status) VALUES ('${data.uid}','${data.sid}','${data.nick}','${data.ip}','${data.status}');`;
    console.log('客服上线')
    return query(sql);
}

//客服离线
const updateServerStatus =(uuid , sid)=>{
    const sql = `UPDATE servers SET status='0' WHERE uuid = '${uuid}' AND sid='${sid}' AND status =1;`;
    console.log('客服离线')
    return query(sql);
}

//查询在线客服
const queryOnLineSever = () =>{
    const sql = `SELECT * FROM servers WHERE status = 1 ORDER BY servers.id DESC;`;
    let res_sql=query(sql);
    // console.log('查询在线客服',res_sql) //必须通过promise异步构造函数才能读取
    return res_sql
}

//写入聊天记录
const insertChat = (data)=>{ // ,'${data.nick}'
console.log('保存聊天记录',data)
    const sql = `INSERT INTO contents (content,to_user,from_user,from_type,type,other,nick) VALUES ('${data.content}','${data.to}','${data.from}','${data.fromType}','${data.type}','${data.other}','${data.nick}');`;
    console.log('插入新聊天纪录')
    return query(sql);
}




module.exports = {
    insertServerOnLine,
    updateServerStatus,
    queryOnLineSever,
    insertChat,
    
}