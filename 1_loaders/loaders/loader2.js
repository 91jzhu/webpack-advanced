// 异步loader

module.exports=function(content,map,meta){
    const callback=this.async()

    // webpack 会等 callback 调用，即为接着进行的信号，之前会一直等
    setTimeout(()=>{
        callback(null,content,map,meta)
        console.log('loader2 async loader')
    },2000)
}