const getCookie= (cookies) =>{
    let cookiesObj = {};
    let tmp = cookies.split(";");
        tmp.map((item)=>{
           let s = item.split("=");
           cookiesObj[s[0].trim()] = s[1];  
        })
     return cookiesObj;   
}

module.exports = getCookie;