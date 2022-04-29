const { getOptions }=require('loader-utils')
const { validate }=require('schema-utils')
const schema=require('./schema.json')

module.exports=function(content,map,meta){
    // 获取options
    const options=getOptions(this)
    // 校验 options 是否合法
    validate(schema,options,{
        // 报错时知道名字
        name:'loader3'
    })
    return content
}