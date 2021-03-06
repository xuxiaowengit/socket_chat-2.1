//前台 - 客户端的clinet.js
// import io from 'socket.io-client';

// let socket = io.connect("http://120.79.139.240:300?type=client", {
//     path: "/chat"
// });
// let socket = io.connect("http://127.0.0.1:300?type=client", {
//     path: "/chat",
//     httpOnly: false
// });
let url_host = window.location.host;
// let socket = io.connect(`http://92.168.43.77:300?type=client`, {
//     path: "/chat",
//     httpOnly: false
// });

let socket = io.connect(`http://` + url_host + `?type=client`, {
    path: "/chat"
        // httpOnly: false
});

$("#sendMessage").click(function() {
    var content = $("#message").val();
    if (content != '') {
        console.log(content);
        var data = {
            content,
            type: 0,
            ohter: null
        };
        //向客服发送消息
        socket.emit("user-message", data);

        //   自己发送消息推倒消息框
        var dete = new Date();
        var str1 =
            `   <div class="chat-for-user chat-item">
                    <div class="chat-item-info">
                        <div class="chat-item-info-nick"> 我<span class="time">` +
            dete +
            `</span></div>
                    </div>
                   <div class="chat-item-detail">
                        <div class="chat-item-content "style="max-width: 100%;min-width:100px;">
                            ` +
            content +
            `
                        </div>
                        <div class="chat-item-user">
                            <div class="chat-item-user-thumb">
                                <span class="glyphicon glyphicon-user"></span>
                            </div>
                        </div>
                    </div>
                </div>`;

        $(".chat-content").append(str1);

        // 设置滚动条
        setScorll();
        $("#message").val("");
    } else {
        showTip('发送内容不能为空', 'danger')
    }
});


// 弹窗提示自定义的
function showTip(tip, type) {
    var $tip = $('#tip');
    $tip.stop(true).prop('class', 'alert alert-' + type).text(tip).css('margin-left', -$tip.outerWidth() / 2).fadeIn(500).delay(2000).fadeOut(500);
}


//监听来自于客服回复的事件推送
socket.on("server-message-push", data => {
    console.log("接收到客服消息：", data);
    var date = new Date(data.time);
    var str =
        ` <div class="chat-for-server chat-item">
    <div class="chat-item-info">
        <div class="chat-item-info-nick">客服：` +
        data.nick +
        ` <span class="time">` +
        date +
        `</span></div>
    </div>
    <div class="chat-item-detail">
        <div class="chat-item-user">
            <div class="chat-item-user-thumb">
                <span class="glyphicon glyphicon-user"></span>
            </div>
        </div>
        <div class="chat-item-content" >
           ` +
        data.data.content +
        `<span class='right text-sm bg-warning' >-(` +
        data.data.other +
        `)</span>
        </div>
    </div>
</div>`;
    $(".chat-content").append(str);
    setScorll();
});

//首次获取聊天记录
window.onload = function() {
    $.ajax({
        url: "/api/getClientChat",
        success(data) {
            console.log("获取到聊天记录", data);
            for (var i = 0; i < data.data.length; i++) {
                if (data.data[i].from_type == "server") {
                    var str =
                        ` <div class="chat-for-server chat-item">
                         <div class="chat-item-info">
                             <div class="chat-item-info-nick">客服：` +
                        data.data[i].nick +
                        ` <span class="time">` +
                        data.data[i].time +
                        `</span></div>
                         </div>
                         <div class="chat-item-detail">
                             <div class="chat-item-user">
                                 <div class="chat-item-user-thumb">
                                     <span class="glyphicon glyphicon-user"></span>
                                 </div>
                             </div>
                             <div class="chat-item-content" >
                                ` +
                        data.data[i].content +
                        `
                             </div>
                         </div>
                     </div>`;

                    $(".chat-content").append(str);
                } else if (data.data[i].from_type == "client") {
                    var str1 =
                        `   <div class="chat-for-user chat-item">
                        <div class="chat-item-info">
                            <div class="chat-item-info-nick"> 我<span class="time">` +
                        data.data[i].time +
                        `</span></div>
                        </div>
                       <div class="chat-item-detail">
                            <div class="chat-item-content "style="max-width: 100%;min-width:100px;">
                                ` +
                        data.data[i].content +
                        `
                            </div>
                            <div class="chat-item-user">
                                <div class="chat-item-user-thumb">
                                    <span class="glyphicon glyphicon-user"></span>
                                </div>
                            </div>
                        </div>
                    </div>`;
                    $(".chat-content").append(str1);
                }
                // console.log(data.data.length,data.data[i].content,data.data[i].from_type)
            }
            setScorll();
        },
        eeror(res) {
            console.log("查询聊天记录错误", data);
        }
    });

    // vue
    var vm = new Vue({
        el: "#app",
        data: {
            name: "kdy",
            job: "软件工程师",
            frist_http: {}
        },
        created() {
            console.log("creartdRUN");
            var cook = document.cookie;
            console.log("cook:", cook);
            // 接受第一次连接信息
            var _this = this;
            socket.on("clinet-frist-push", data => {
                console.log("clinet-frist-push:", data);
                _this.frist_http = data;
                console.log("data11:", _this.frist_http);
            });
            // console.log('data1:', this.name)
        },
        destroyed() {
            // console.log('data2:', this.job)
        },
        methods:{
          send(){
                alert("delete");
             }
           }
    });




// 开关选择字体列表
     console.log('onloadRun')
            $('#kinerDatePickerInput1').kinerDatePicker({
                clickMaskHide: true,
                okHandler: function(vals, ctx) {
                    console.log("确定选择:", vals, ctx);
                    console.log('vals:', vals[0])
                    var nb = vals[0]
                    var font = {
                            楷体: "KaiTi",
                            宋体: "STFangsong",
                            微软雅黑: "Microsoft YaHei",
                            行书: 'STXingkai',
                            华文彩云: 'STCaiyun'
                        }
                        // console.log(font[nb])
                    $('#btn1').css('font-family', font[nb])
                     $('#message').css('font-family', font[nb])
                },
                cancelHandler: function(ctx) {
                    console.log("取消选择:", ctx);
                }
            });
};

// 滚动条设置函数
function setScorll() {
    var chat_item = document.getElementsByClassName("chat-item");
    var itemH = $(".chat-item").outerHeight(true);
    var socrollH = chat_item.length * itemH;
    console.log(socrollH, itemH);
    $(".chat-content").scrollTop(socrollH);
}

   

            $('#btn1').click(function() {
                console.log($('#kinerDatePickerInput1').kinerDatePickerVal());
                console.log('click')
            });


// t图片上传跳转
        function getimage() {
            window.location.href = '/image'
        }