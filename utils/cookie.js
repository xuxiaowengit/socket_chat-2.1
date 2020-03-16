const getCookie= (cookies) =>{
    let cookiesObj = {};
   if(cookies!=''&&cookies!=undefined){
      // console.log('getcook之前：',cookies)
      let tmp=[];
      if((cookies.indexOf(';'))!='-1'){
      //   console.log('含有;',cookies.indexOf(';'))
         tmp = cookies.split(";");
     }else{
      //   console.log('不含有;',cookies.indexOf(';'))
         tmp[0] = cookies;
     }
          tmp.map((item)=>{
           let s = item.split("=");
             cookiesObj[s[0].trim()] = s[1];  
             console.log('getcookies:',cookiesObj[0])
          })
       return cookiesObj;   
   }

  
}

module.exports = getCookie;