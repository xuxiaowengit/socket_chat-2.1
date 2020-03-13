//负责聊天socket.io事件 绑定处理模块
const chatServer = require("../service/chatServer");
const getCookie = require("../utils/cookie");

//导入操作client的数据模型
const clientModel = require("../model/chatClientModel");
//导入操作server的数据模型
const serverModel = require("../model/chatServerModel");

let clientCount = 0;//记录当前网站在线用户流水号 用于生成编号 = 》 游客1 

let servers = [];//存储所有的客服端数据 

//ws连接事件 （不区分client 和 server）
chatServer.on("connection", (socket) => {
    let role = socket.handshake.query.type; //获取当前连接的终端类型： 区分client（用户） 和 server（客服）

    //获取cookie
    let cookies = getCookie(socket.handshake.headers.cookie);
    let uid = cookies.uuid;
    let sid=socket.id;
    //获取访问客户端的ip0
    let ip = socket.request.connection.remoteAddress;
    ip = ip.split(":").slice(-1)[0];
    let server_nick='';
    // console.log(uid);
    //存储当前接入的用户的socket , 需要根据访问的终端类型
    let nick = null;//准备记录的昵称
    if (role == "client") {
       
        //上线：准备写入数据库的数据(还需要判断当前用户是否是一个新用户)
        clientModel.queryClinetUUID(uid).then((res) => {
            // console.log('查询uuid结果：',res);
            var data = {
                uid:uid,
                sid: socket.id,
                nick,
                ip:ip,
                status:1
            };

           
            if (res.length <= 0) {//新用户
                clientCount++;
                data.nick = "游客" + clientCount;
                console.log('没有查询到UUID，全新用户',data)
                  //记录上线记录
              
            } else {//老用户
                data.nick = res[0].nick||'游客x';
                console.log('查询到UUID，老用户',data ,res[0])//,res[0],data
                // data.status=0;
                console.log('UID&SID',uid,sid)
                clientModel.updateClientSid(uid,sid).then((res)=>{
                    console.log('更新在线用户sid-2',res.insertId)
                })
                  //当用户上线，向客服推送上线的更新提示    
                  pushClient()
            }

            // 新添加新开启客户页面的客户 不限于同一个浏览器
            console.log('新上线data:',data)
            clientModel.insertClientOnLine(data).then((res) => {
                console.log('写入新上线成功',res.insertId);
                })


          
        })
      




        //离线操作 ： 更新当前用户的状态
        socket.on("disconnect", () => {
            // console.log('用户离线',role);
            clientModel.updateClientStatus(uid, socket.id).then((res) => {console.log('更新客户离线名单',res.insertId) });
            pushClient()
        })
    } else {
        //客服上线
        let data = {
            uid,
            ip,
            sid: socket.id,
            nick: "小萝莉",
            status:1
        }
        serverModel.insertServerOnLine(data).then((res) => {console.log('记录新上线客服',res.insertId) });

        //绑定客服离线操作：
        socket.on("disconnect", () => {
            serverModel.updateServerStatus(uid, socket.id).then((res) => { console.log('更新客服离线名单',res.insertId)});
        })
        pushClient();
    }


   function pushClient(){
    serverModel.queryOnLineSever().then((res) => {
        console.log('在线客服查询完成：');//,res[0]
     if (res.length > 0) {
         clientModel.queryAllOnline().then((data) => {
             socket.to(res[0].sid).emit('client-online-event', { data });
             console.log('查询在线客户完成')//,data[0]
         })
     } else {
         console.log('没有客服在线...');
     }
    })
   }

    //绑定用户发送的消息事件
    socket.on('user-message', (data) => {
        // console.log("当前发送消息用户的uuid:",uid)
        console.log('已经收到用户的消息：',data);
       
        //查询是否由客服在线
        serverModel.queryOnLineSever().then((res) => {//查询在线客服户
             //包装数据（完善一个完整的交互需要的数据）
                let json = {
                   data,
                   from: uid,
                   nick:nick||'游客X',
                   time: new Date().getTime(),
                   content: data.content,
                  type: data.type,
                    to: res[0].uuid,
                 fromType: "client",//客户端发送给客服端的
                  other:data.other||null
               }

            if (res.length > 0) {
                //将消息发送给指定的客服即可
                // console.log(res[0]);
                socket.to(res[0].sid).emit('clinet-message-push', json);
                //记录消息内容
                serverModel.insertChat(json).then((res) => { 
                    console.log('保存用户消息',res.insertId)
                }).catch((err) => {
                    console.log("保存客户发来新聊天记录失败！",err);
                });
            } else {
                console.log('没有在线客服')
                //提示用户暂无客服在线
            }
        })

    })

    //客服回复用户消息事件
    socket.on("server-message", (data) => {
        console.log("收到客服发送给客户的消息",data);
        //包装数据（完善一个完整的交互需要的数据）
        let json = {
            data,
            from: uid,
            nick:server_nick||'小萝莉2',
            time: new Date().getTime()
        }
        //发送消息
        if(data.to.sid.length<=0){
            console.log("群发消息：",data.content)
            socket.broadcast.emit('server-message-push',json) //群发需要加braodcast
       
        }else{
            console.log('来之客服的点对点发送')
            for(i=0;i<data.to.sid.length;i++){
                socket.to(data.to.sid[i]).emit("server-message-push",json);
               }
        }
      

         serverModel.queryOnLineSever().then((res)=>{
           console.log('查询在线客服:',res[0])
           server_nick=res[0].nick
         })
        //记录聊天
         //记录消息内容
         let params = {
            content: data.content,
            type: data.type,
            from: uid||null,
            nick:server_nick||'小萝莉客服',
            to: data.to.uuid[0]||null,
            fromType: "server",//客服端发送给客户端的
            other:data.other||null
        }
        serverModel.insertChat(params).then((res)=>{console.log('保存客服发来给客户的消息',res.insertId)}).catch((err) => {
            console.log("保存客服转发新聊天记录失败！",err);
        });;
    })
})

