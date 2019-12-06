const setCookie= (token)=>{
    console.log("gg: ", token)
    var now = new Date()
    now.setTime(now.getTime()+24*60*60*1000)
    console.log("hsd: ", now.toUTCString())
    document.cookie = `token=${token};expires=${now.toUTCString()}`;
}
export default setCookie
