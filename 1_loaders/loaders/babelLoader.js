const { getOptions } = require('loader-utils')
const { validate } = require('schema-utils')
const babel = require('@babel/core')
const util=require('util')

const babelSchema = require('./babelSchema.json')

// babel.transform 是一个编译代码的异步方法
const transform=util.promisify(babel.transform)

module.exports = function (content, map, meta) {
    const options = getOptions(this) || {}
    const callback = this.async()
    validate(babelSchema, options, {
        name: 'babelLoader'
    })
    // 使用 babel 编译代码
    transform(content,options)
        .then(({code,map})=>{
            callback(null,code,map,meta)
        })
        .catch(e=>{
            callback(e)
        })
}