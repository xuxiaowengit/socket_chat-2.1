const mysql = require("mysql");

const pool = mysql.createPool({
    // host:"127.0.0.1",
    host: "120.79.139.240",
    user: "root",
    password: "root",
    database: "socket_chat",
    port: 3306
})

const query = (sql) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, data, fileds) => {
            if (err) {
                reject("数据库连接错误:", err);
            }
            resolve(data, fileds);
        })
    })
}

module.exports = query;