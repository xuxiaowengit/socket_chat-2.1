// (function () {
//     var supportsOrientationChange = 'onorientationchange' in window ? 'orientationchange' : 'resize';
//     //防抖函数
//     function debounce(handler, interval) {
//         var timer = null;
//         handler(); //首次执行
//         return function () {
//             if (timer != null) clearTimeout(timer);
//             timer = setTimeout(handler, interval)
//         }
//     }
//     //具体的处理函数
//     function handler() {
//         var clientW = window.innerWidth;//获取当前窗口的宽度
//         clientW = clientW >= 667 ? 667 : clientW; //限制最大的宽度
//         var fz = clientW / 375 * 100;
//         var view_width = document.getElementsByTagName('html')[0].getBoundingClientRect().width;
//         var _html = document.getElementsByTagName('html')[0];
//         document.documentElement.style.fontSize = fz + "px";
//         view_width=view_width>667 ? 667 / 3.75 : view_width / 3.75;
//         var sw = view_width / 3.75
//         var lw = (fz + sw) / 5
//         document.documentElement.style.fontSize = lw + "px";
//         _html.style.fontSize = lw + 'px'
//         console.log("_html.style.fontSize:", view_width, "fz:", fz + "px")
//     }
//     //监听窗口的缩放事件
//     window.addEventListener(supportsOrientationChange, debounce(handler, 300));
// })()


(function (doc, win) {    
	var docEl = doc.documentElement,        
	resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',        
	recalc = function () {            
		var clientWidth = docEl.clientWidth;            
		if (!clientWidth) return;            
		
		if(clientWidth>750) clientWidth=750;	//这里限制最大的宽度尺寸，从而实现PC端的两边留白等            
 
        docEl.style.fontSize = 10 * (clientWidth / 320) + 'px';        
        console.log(clientWidth)
	};    
 
	if (!doc.addEventListener) return;    
 
	win.addEventListener(resizeEvt, recalc, false);    
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);