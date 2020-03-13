//前台 - 客户端的clinet.js

let socket = io.connect("http://127.0.0.1:300?type=client", {
    path: "/chat"
});

$("#sendMessage").click(function () {
    var content = $("#message").val();
    console.log(content);
    var data = {
        content,
        type: 0,
        ohter: null
    }
    //向客服发送消息
    socket.emit("user-message", data);

//   自己发送消息推倒消息框
var dete=new Date();
var str1 = `   <div class="chat-for-user chat-item">
                    <div class="chat-item-info">
                        <div class="chat-item-info-nick"> 我<span class="time">` + dete + `</span></div>
                    </div>
                   <div class="chat-item-detail">
                        <div class="chat-item-content "style="max-width: 100%;min-width:100px;">
                            ` + content + `
                        </div>
                        <div class="chat-item-user">
                            <div class="chat-item-user-thumb">
                                <span class="glyphicon glyphicon-user"></span>
                            </div>
                        </div>
                    </div>
                </div>`;



    $('.chat-content').append(str1)

    // 设置滚动条
   setScorll()
   $("#message").val()
})

//监听来自于客服回复的事件推送
socket.on("server-message-push", (data) => {
    console.log('接收到客服消息：', data);
    var date=new Date(data.time)
    var str = ` <div class="chat-for-server chat-item">
    <div class="chat-item-info">
        <div class="chat-item-info-nick">客服：` + data.nick + ` <span class="time">` +date + `</span></div>
    </div>
    <div class="chat-item-detail">
        <div class="chat-item-user">
            <div class="chat-item-user-thumb">
                <span class="glyphicon glyphicon-user"></span>
            </div>
        </div>
        <div class="chat-item-content" >
           ` + data.data.content + `<span class='right text-sm bg-warning' >-(`+data.data.other+`)</span>
        </div>
    </div>
</div>`;
$('.chat-content').append(str)

setScorll();

})

//首次获取聊天记录
$.ajax({
    url: "/api/getClientChat",
    success(data) {
        console.log('获取到聊天记录', data);
        for (var i = 0; i < data.data.length; i++) {
            if (data.data[i].from_type == 'server') {
                var str = ` <div class="chat-for-server chat-item">
                     <div class="chat-item-info">
                         <div class="chat-item-info-nick">客服：` + data.data[i].nick + ` <span class="time">` + data.data[i].time + `</span></div>
                     </div>
                     <div class="chat-item-detail">
                         <div class="chat-item-user">
                             <div class="chat-item-user-thumb">
                                 <span class="glyphicon glyphicon-user"></span>
                             </div>
                         </div>
                         <div class="chat-item-content" >
                            ` + data.data[i].content + `
                         </div>
                     </div>
                 </div>`;

                $('.chat-content').append(str)

            } else if(data.data[i].from_type =='client') {
                         var str1 = `   <div class="chat-for-user chat-item">
                    <div class="chat-item-info">
                        <div class="chat-item-info-nick"> 我<span class="time">` + data.data[i].time + `</span></div>
                    </div>
                   <div class="chat-item-detail">
                        <div class="chat-item-content "style="max-width: 100%;min-width:100px;">
                            ` + data.data[i].content + `
                        </div>
                        <div class="chat-item-user">
                            <div class="chat-item-user-thumb">
                                <span class="glyphicon glyphicon-user"></span>
                            </div>
                        </div>
                    </div>
                </div>`;
                $('.chat-content').append(str1)
            }

                // console.log(data.data.length,data.data[i].content,data.data[i].from_type)

        }
        setScorll();
    },
    eeror(res) {
        console.log('查询聊天记录错误', data)
    }

   
})


// 滚动条设置函数
function setScorll(){
    var chat_item=document.getElementsByClassName('chat-item');
    var itemH=$('.chat-item').outerHeight(true)
    var  socrollH=(chat_item.length)* (itemH)
    console.log(socrollH,itemH)
    $('.chat-content').scrollTop(socrollH)
}