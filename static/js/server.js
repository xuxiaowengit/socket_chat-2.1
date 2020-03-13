//前台 - 客户端的clinet.js

let socket = io.connect("http://127.0.0.1:300?type=server", {
    path: "/chat"
});

socket.on("client-online-event", (data) => {
    console.log("游客上线推送...", data);
    //渲染页面内容
    renderClient(data);
})



//封装一个渲染用户列表数据的方法
function renderClient(data) {
    let htmlStr = "";
    let htmlStr2 = "";
    let htmlStr1="";
    $.each(data.data, (index, item) => {
        htmlStr += `<div class="person" data-sid="${item.sid}" title='请单击选择对话客户' data-uid="${item.uuid}">${index + 1}. ${item.nick}  <span class="badge">n</span></div>`;
        htmlStr1 = ` <li class="sidebar-brand" style="text-decoration: node;list-style: none;"><a href="#" id='h4'><h4 class="user-count">在线游客(<span class="count">100</span>)`+
                    `<span class="glyphicon glyphicon-chevron-left is-open animated  active fadeInLeft"data-toggle="offcanvas" id="close"></span></h4></a></li>`;
        htmlStr2 += `<li class="person" data-sid="${item.sid}" title='请单击选择对话客户' data-uid="${item.uuid}"><a href="#"><i class="fa fa-fw fa-user"></i>${index+1}. ${item.nick}<span class="badge">n</span></a></li>`;
    });
    //插入
    $(".user-list").html(htmlStr);
    $(".user-list2").html(htmlStr1+htmlStr2);
    $(".user-count  span.count ").html(data.data.length); //更新在线人数
}

// 点击列表用户 获取对应用户信息
let uuid = [];
let sid = [];
$('#user-container .user-list ').on('click', 'div.person', function (e) {
    //    console.log(e)
    console.log("div", this)
    choeseUser(this)
})
$('#wrapper .user-list2 ').on('click', 'li.person', function (e) {
    //    console.log(e)
    console.log('li', this)
    choeseUser(this)
})


// 共同处理列表被单击后的切换类及添加或删除数组
function choeseUser(this2) {
    // console.log("this2",this2)
    if ($(this2).hasClass('on')) {
        $(this2).removeClass('on')
        uuid = uuid.filter((item) => {
            return item != $(this2).attr("data-uid");
        })
        sid = sid.filter((item) => {
            return item != $(this2).attr("data-sid");
        })
    } else {
        $(this2).addClass('on')
        uuid.push($(this2).attr("data-uid"))
        sid.push($(this2).attr("data-sid"))

    }
    console.log(uuid, sid)

    // 获取选定客户的聊天记录
    $.ajax({
        url:'/api/getServertChat',
        success(data){
         console.log('获取到选定客户的历史聊天记录:',data)
         $('#chat-content').html("");
        for(var i=0;i<data.data.length;i++){
          if(data.data[i].from_type=='client'){
               var server_ms=`<div class="chat-for-server chat-item">
               <div class="chat-item-info">
                   <div class="chat-item-info-nick">`+data.data[i].nick +`<span class="time">`+data.data[i].time+`</span></div>
               </div>
               <div class="chat-item-detail">
                   <div class="chat-item-user">
                       <div class="chat-item-user-thumb">
                           <span class="glyphicon glyphicon-user"></span>
                       </div>
                   </div>
                   <div class="chat-item-content">
                      `+data.data[i].content+`
                   </div>
               </div>
               </div>`;
              
            $('#chat-content').append(server_ms)
             
          }else if(data.data[i].from_type=='server'){ //一定要双== 不然几十赋值了
              let str=` <div class="chat-for-user chat-item">
              <div class="chat-item-info">
                  <div class="chat-item-info-nick"> 我<span class="time">`+data.data[i].time+`</span></div>
              </div>
              <div class="chat-item-detail">
                  <div class="chat-item-content">
                      `+data.data[i].content+`
                  </div>
                  <div class="chat-item-user">
                      <div class="chat-item-user-thumb">
                          <span class="glyphicon glyphicon-user"></span>
                      </div>
                  </div>
              </div>
          </div>`
          $('#chat-content').append(str)
          }


        }

    
           
       var time=setTimeout(()=>{
        setScorll();
       },100)

        },
        error(res){
           console.log('请求获取选定客户的历史记录失败',res)
        }
    })

   
}

// hu请求用户在线明单
$.ajax({
    url: "/api/getOnlineClient",
    success: function (data) {
        renderClient(data);
        console.log('请求到在线用户列表', data)
    }
})

//绑定发送事件
$("#sendMessage").click(function () {
    var content = $("#message").val();
    var uuid2 = [],
        sid2 = [];
    var data = {
        content,
        type: 0,
        to: {
            uuid: uuid2,
            sid: sid2
        }
    };
    console.log(sid, uuid)
    if (sid.length < 1 && uuid.length < 1) { // $(".person").eq(0).attr("data-sid")
        console.log('没有选择用户将让后台广播消息')
        data.other = '群发消息'
    } else {
        uuid2 = uuid;
        sid2 = sid;
        data.other='定向发送'
        data.to= {
                uuid: uuid2,
                sid: sid2
            }
        
    }



    console.log('向后台发送信息给指定用户', data)
    //向客服发送消息
    socket.emit("server-message", data);


    let str=` <div class="chat-for-user chat-item">
    <div class="chat-item-info">
        <div class="chat-item-info-nick"> 我<span class="time">`+new Date()+`</span></div>
    </div>
    <div class="chat-item-detail">
        <div class="chat-item-content">
            `+content+`-<span>`+ data.other+`</span>
        </div>
        <div class="chat-item-user">
            <div class="chat-item-user-thumb">
                <span class="glyphicon glyphicon-user"></span>
            </div>
        </div>
    </div>
    </div>`
    //将自己的发言添加到信息框
    $('#chat-content').append(str)

    // 刷新滚福条
    setScorll()
    $("#message").val("")
})

// 
socket.on("clinet-message-push", (data) => {
    console.log("已经收到游客的消息", data);
    var time=new Date(data.time)
    var server_ms=`<div class="chat-for-server chat-item">
    <div class="chat-item-info">
        <div class="chat-item-info-nick">`+data.nick +`<span class="time">`+time+`</span></div>
    </div>
    <div class="chat-item-detail">
        <div class="chat-item-user">
            <div class="chat-item-user-thumb">
                <span class="glyphicon glyphicon-user"></span>
            </div>
        </div>
        <div class="chat-item-content">
           `+data.content+`
        </div>
    </div>
    </div>`;
   
 $('#chat-content').append(server_ms)


 setScorll()
})

socket.on("message", (data) => {
    console.log("已经收到游客2的消息", data);
})



//首次获取聊天记录
$.ajax({
    url: "/api/getClientChat",
    success(data) {
        console.log("获取到聊天记录", data);
    },
    error(res) {
        console.log("获取留言记录失败", res)
    }

})


// 滚动条设置函数
function setScorll(){
    var chat_item=document.getElementsByClassName('chat-item');
    var itemH=$('#chat-content .chat-item').outerHeight(true)
    var  socrollH=(chat_item.length)* (itemH)
    console.log("scroll：",socrollH,itemH,chat_item.length)
    $('#chat-content').scrollTop(socrollH)
}




 