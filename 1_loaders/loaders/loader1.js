// loader 本质为函数

module.exports=function(content,map,meta){
    console.log(content,map,meta)

    this.callback(null,content,map,meta)
    // 或
    // return content
}